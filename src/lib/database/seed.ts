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

  // 2. Ensure default teachers exist, then insert 7 new ones
  await getTeachers(); // triggers ensureTeachersSeeded()

  const newTeacherIds: string[] = [];
  for (const t of NEW_TEACHERS) {
    const id = uuid();
    newTeacherIds.push(id);
    await db.execute(
      "INSERT INTO teachers (id, name, specialization, department, email, phone, experience, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, 1)",
      [id, t.name, t.specialization, t.department, null, null, t.experience]
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

  // 4. Insert 50 students
  const studentDepts: Array<{ dept: string; count: number }> = [
    { dept: "quran", count: 20 },
    { dept: "tajweed", count: 15 },
    { dept: "tarbawi", count: 15 },
  ];

  const allStudentIds: string[] = [];
  const quranStudentIds: string[] = [];
  const studentTeacherMap: Record<string, string> = {}; // studentId -> teacherId

  const usedNames = new Set<string>();

  for (const { dept, count } of studentDepts) {
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

      await db.execute(
        `INSERT INTO students (id, name, age, grade, department, teacher_id, parts_memorized, attendance, parent_name, parent_phone, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 1)`,
        [id, name, age, grade, dept, teacherId, partsMem, attendancePct, pick(PARENT_NAMES), null]
      );
    }
  }

  // 5. Generate 30 days of attendance records (~40 students/day)
  const statuses = ["حاضر", "حاضر", "حاضر", "حاضر", "حاضر", "حاضر",
                     "غائب", "غائب", "مأذون"]; // ~67% present, ~22% absent, ~11% excused
  let attendanceCount = 0;

  for (let day = 1; day <= 30; day++) {
    // Skip Fridays (approx)
    const d = new Date();
    d.setDate(d.getDate() - day);
    if (d.getDay() === 5) continue; // Friday

    const date = dateStr(day);
    const studentsToday = allStudentIds.filter(() => Math.random() < 0.8); // ~80% of students each day

    for (const studentId of studentsToday) {
      const id = uuid();
      const status = pick(statuses);
      await db.execute(
        "INSERT INTO attendance_records (id, student_id, teacher_id, record_date, status) VALUES ($1, $2, $3, $4, $5)",
        [id, studentId, studentTeacherMap[studentId], date, status]
      );
      attendanceCount++;
    }
  }

  // 6. Generate quran sessions for quran-department students (~120 sessions)
  let sessionCount = 0;

  for (const studentId of quranStudentIds) {
    const numSessions = randomInt(4, 8);
    for (let s = 0; s < numSessions; s++) {
      const id = uuid();
      const daysAgo = randomInt(1, 30);
      const date = dateStr(daysAgo);
      const surah = pick(SURAHS);
      const versesFrom = randomInt(1, 20);
      const versesTo = versesFrom + randomInt(3, 15);
      const rating = weightedRating();

      await db.execute(
        "INSERT INTO quran_sessions (id, student_id, teacher_id, session_date, surah_name, verses_from, verses_to, performance_rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [id, studentId, studentTeacherMap[studentId], date, surah, versesFrom, versesTo, rating]
      );
      sessionCount++;
    }
  }

  return `DONE:${allStudentIds.length}:${newTeacherIds.length + 3}:${attendanceCount}:${sessionCount}`;
}

export async function clearDemoData(): Promise<string> {
  const db = await getDb();

  // Check if there's any data to clear
  const students = await db.select<{ count: number }[]>("SELECT COUNT(*) as count FROM students");
  if (students[0].count === 0) {
    return "NO_DATA";
  }

  // Delete in foreign-key-safe order: children first, then parents
  await db.execute("DELETE FROM quran_sessions");
  await db.execute("DELETE FROM attendance_records");
  await db.execute("DELETE FROM students");
  await db.execute("DELETE FROM teachers");

  return "CLEARED";
}
