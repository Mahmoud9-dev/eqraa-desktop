import { logger } from "@/lib/logger";
import { getDb, uuid } from "./db";
import { getStudents } from "./repositories/students";
import { getTeachers } from "./repositories/teachers";

// --- Helper utilities ---

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function dateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// Weighted random: favors middle values (6-8)
function weightedRating(): number {
  const weights = [0, 0, 0, 1, 2, 3, 5, 7, 5, 3, 1]; // index = rating 0-10
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return 7;
}

// --- Seed data arrays ---

const FIRST_NAMES = [
  "محمد", "أحمد", "عبدالله", "عمر", "يوسف", "خالد", "إبراهيم", "علي",
  "حسن", "حسين", "سعد", "فهد", "ماجد", "سلطان", "عبدالرحمن", "طارق",
  "بلال", "أنس", "زياد", "مصطفى", "ياسر", "نايف", "تركي", "سامي",
  "وليد", "هاني", "رامي", "باسم", "كريم", "آدم",
];

const LAST_NAMES = [
  "العلي", "الحسن", "المحمد", "الأحمد", "السعيد", "الخالد", "العمر",
  "الإبراهيم", "الحربي", "الشمري", "الدوسري", "القحطاني", "الغامدي",
  "الزهراني", "المالكي", "العتيبي", "المطيري", "الرشيدي", "البلوي",
  "الحازمي",
];

const PARENT_NAMES = [
  "أبو محمد", "أبو أحمد", "أبو عبدالله", "أبو عمر", "أبو يوسف",
  "أبو خالد", "أبو إبراهيم", "أبو علي", "أبو حسن", "أبو سعد",
];

const GRADES = [
  "الثالث", "الرابع", "الخامس", "السادس",
  "الأول متوسط", "الثاني متوسط", "الثالث متوسط",
  "الأول ثانوي", "الثاني ثانوي", "الثالث ثانوي",
];

const SURAHS = [
  "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة",
  "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
  "هود", "يوسف", "الرعد", "إبراهيم", "الحجر",
  "النحل", "الإسراء", "الكهف", "مريم", "طه",
];

const NEW_TEACHERS = [
  { name: "الشيخ عبدالرحمن السعيد", specialization: "حفظ القرآن الكريم", department: "quran", experience: 15 },
  { name: "الشيخ سعد الدوسري", specialization: "حفظ القرآن الكريم ومراجعته", department: "quran", experience: 10 },
  { name: "الشيخ فهد القحطاني", specialization: "حفظ القرآن الكريم", department: "quran", experience: 8 },
  { name: "الشيخ ماجد الحربي", specialization: "أحكام التجويد والقراءات", department: "tajweed", experience: 11 },
  { name: "الشيخ سلطان الشمري", specialization: "مخارج الحروف وصفاتها", department: "tajweed", experience: 6 },
  { name: "الأستاذ طارق الغامدي", specialization: "التربية الإسلامية والسيرة", department: "tarbawi", experience: 5 },
  { name: "الأستاذ بلال المالكي", specialization: "الفقه والعبادات", department: "tarbawi", experience: 4 },
];

// --- Main seed function ---

export async function seedDemoData(): Promise<string> {
  // 1. Guard: skip if data already exists
  const existingStudents = await getStudents();
  if (existingStudents.length > 10) {
    return "DATA_EXISTS";
  }

  const db = await getDb();

  // 2. Ensure default teachers exist, then insert 7 new demo teachers
  await getTeachers(); // triggers ensureTeachersSeeded()

  // Batch-insert all new demo teachers in a single round-trip.
  // 7 teachers * 7 bind columns = 49 variables (well under SQLite's 999 limit).
  const newTeacherIds: string[] = NEW_TEACHERS.map(() => uuid());
  {
    const valuePlaceholders: string[] = [];
    const params: (string | number | null)[] = [];
    NEW_TEACHERS.forEach((t, index) => {
      const base = index * 7;
      valuePlaceholders.push(
        `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7}, 1, 1)`
      );
      params.push(newTeacherIds[index], t.name, t.specialization, t.department, null, null, t.experience);
    });
    await db.execute(
      `INSERT INTO teachers (id, name, specialization, department, email, phone, experience, is_active, is_demo) VALUES ${valuePlaceholders.join(", ")}`,
      params
    );
  }

  // 3. Get all teachers grouped by department
  const allTeachers = await db.select<{ id: string; department: string }[]>(
    "SELECT id, department FROM teachers WHERE is_active = 1"
  );
  const teachersByDept: Record<string, string[]> = { quran: [], tajweed: [], tarbawi: [] };
  for (const t of allTeachers) {
    teachersByDept[t.department]?.push(t.id);
  }

  // 4. Insert 50 students (skip departments with no active teachers)
  const studentDepts: Array<{ dept: string; count: number }> = [
    { dept: "quran", count: 20 },
    { dept: "tajweed", count: 15 },
    { dept: "tarbawi", count: 15 },
  ];

  const allStudentIds: string[] = [];
  const quranStudentIds: string[] = [];
  const studentTeacherMap: Record<string, string> = {}; // studentId -> teacherId

  // Phase A: build all student rows in memory (no DB calls yet).
  type StudentRow = [string, string, number, string, string, string, number, number, string, null];
  const studentRows: StudentRow[] = [];
  const usedNames = new Set<string>();

  for (const { dept, count } of studentDepts) {
    if (teachersByDept[dept].length === 0) {
      logger.warn(`[seed] No active teachers in department "${dept}", skipping student seeding for this dept.`);
      continue;
    }

    for (let i = 0; i < count; i++) {
      let name: string;
      do {
        name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
      } while (usedNames.has(name));
      usedNames.add(name);

      const id = uuid();
      const teacherId = pick(teachersByDept[dept]);
      const age = randomInt(8, 18);
      const grade = GRADES[Math.min(age - 8, GRADES.length - 1)];
      const partsMem = dept === "quran" ? randomInt(1, 30) : randomInt(0, 5);
      const attendancePct = randomInt(60, 100);

      allStudentIds.push(id);
      if (dept === "quran") quranStudentIds.push(id);
      studentTeacherMap[id] = teacherId;
      studentRows.push([id, name, age, grade, dept, teacherId, partsMem, attendancePct, pick(PARENT_NAMES), null]);
    }
  }

  // Phase B: batch-insert all students in a single round-trip.
  // 50 students * 10 bind columns = 500 variables (well under SQLite's 999 limit).
  if (studentRows.length > 0) {
    const valuePlaceholders: string[] = [];
    const params: (string | number | null)[] = [];
    studentRows.forEach((row, index) => {
      const base = index * 10;
      valuePlaceholders.push(
        `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7}, $${base + 8}, $${base + 9}, $${base + 10}, 1, 1)`
      );
      params.push(...row);
    });
    await db.execute(
      `INSERT INTO students (id, name, age, grade, department, teacher_id, parts_memorized, attendance, parent_name, parent_phone, is_active, is_demo) VALUES ${valuePlaceholders.join(", ")}`,
      params
    );
  }

  // 5. Generate 30 days of attendance records (~40 students/day).
  // Rows are collected first, then flushed in chunks of 100 (5 columns * 100 = 500 variables per chunk).
  const statuses = ["حاضر", "حاضر", "حاضر", "حاضر", "حاضر", "حاضر",
                     "غائب", "غائب", "مأذون"]; // ~67% present, ~22% absent, ~11% excused
  const ATTENDANCE_CHUNK_SIZE = 100;

  type AttendanceRow = [string, string, string, string, string];
  const attendanceRows: AttendanceRow[] = [];

  for (let day = 1; day <= 30; day++) {
    const d = new Date();
    d.setDate(d.getDate() - day);
    if (d.getDay() === 5) continue; // Skip Fridays

    const date = dateStr(day);
    const studentsToday = allStudentIds.filter(() => Math.random() < 0.8); // ~80% of students each day

    for (const studentId of studentsToday) {
      attendanceRows.push([uuid(), studentId, studentTeacherMap[studentId], date, pick(statuses)]);
    }
  }

  const attendanceCount = attendanceRows.length;

  for (let chunkStart = 0; chunkStart < attendanceRows.length; chunkStart += ATTENDANCE_CHUNK_SIZE) {
    const chunk = attendanceRows.slice(chunkStart, chunkStart + ATTENDANCE_CHUNK_SIZE);
    const valuePlaceholders: string[] = [];
    const params: (string | null)[] = [];
    chunk.forEach((row, index) => {
      const base = index * 5;
      valuePlaceholders.push(
        `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, 1)`
      );
      params.push(...row);
    });
    await db.execute(
      `INSERT INTO attendance_records (id, student_id, teacher_id, record_date, status, is_demo) VALUES ${valuePlaceholders.join(", ")}`,
      params
    );
  }

  // 6. Generate quran sessions for quran-department students (~120 sessions).
  // Rows are collected first, then flushed in chunks of 100 (8 columns * 100 = 800 variables per chunk).
  const QURAN_CHUNK_SIZE = 100;

  type QuranSessionRow = [string, string, string, string, string, number, number, number];
  const quranSessionRows: QuranSessionRow[] = [];

  for (const studentId of quranStudentIds) {
    const numSessions = randomInt(4, 8);
    for (let s = 0; s < numSessions; s++) {
      const daysAgo = randomInt(1, 30);
      const date = dateStr(daysAgo);
      const surah = pick(SURAHS);
      const versesFrom = randomInt(1, 20);
      const versesTo = versesFrom + randomInt(3, 15);
      const rating = weightedRating();
      quranSessionRows.push([uuid(), studentId, studentTeacherMap[studentId], date, surah, versesFrom, versesTo, rating]);
    }
  }

  const sessionCount = quranSessionRows.length;

  for (let chunkStart = 0; chunkStart < quranSessionRows.length; chunkStart += QURAN_CHUNK_SIZE) {
    const chunk = quranSessionRows.slice(chunkStart, chunkStart + QURAN_CHUNK_SIZE);
    const valuePlaceholders: string[] = [];
    const params: (string | number)[] = [];
    chunk.forEach((row, index) => {
      const base = index * 8;
      valuePlaceholders.push(
        `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7}, $${base + 8}, 1)`
      );
      params.push(...row);
    });
    await db.execute(
      `INSERT INTO quran_sessions (id, student_id, teacher_id, session_date, surah_name, verses_from, verses_to, performance_rating, is_demo) VALUES ${valuePlaceholders.join(", ")}`,
      params
    );
  }

  return `DONE:${allStudentIds.length}:${newTeacherIds.length + 3}:${attendanceCount}:${sessionCount}`;
}

export async function clearDemoData(): Promise<string> {
  const db = await getDb();

  // Check if there is any demo data to clear
  const result = await db.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM students WHERE is_demo = 1"
  );
  if (result[0].count === 0) {
    return "NO_DATA";
  }

  // Delete only demo rows in foreign-key-safe order (children first, then parents),
  // wrapped in a transaction so partial failures leave the DB consistent.
  await db.execute("BEGIN");
  try {
    await db.execute("DELETE FROM quran_sessions WHERE is_demo = 1");
    await db.execute("DELETE FROM attendance_records WHERE is_demo = 1");
    await db.execute("DELETE FROM students WHERE is_demo = 1");
    await db.execute("DELETE FROM teachers WHERE is_demo = 1");
    await db.execute("COMMIT");
  } catch (err) {
    await db.execute("ROLLBACK");
    throw err;
  }

  return "CLEARED";
}
