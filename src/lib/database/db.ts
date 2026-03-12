import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

const SCHEMA = `
PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS teachers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  department TEXT NOT NULL CHECK (department IN ('quran', 'tajweed', 'tarbawi')),
  is_active INTEGER DEFAULT 1,
  email TEXT,
  phone TEXT,
  experience INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_teachers_department ON teachers(department);

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  grade TEXT NOT NULL,
  teacher_id TEXT REFERENCES teachers(id),
  department TEXT NOT NULL CHECK (department IN ('quran', 'tajweed', 'tarbawi')),
  parts_memorized INTEGER DEFAULT 0,
  current_progress TEXT,
  previous_progress TEXT,
  is_active INTEGER DEFAULT 1,
  parent_name TEXT,
  parent_phone TEXT,
  attendance INTEGER DEFAULT 0,
  images TEXT DEFAULT '{}',
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_students_teacher_id ON students(teacher_id);
CREATE INDEX IF NOT EXISTS idx_students_department ON students(department);

CREATE TABLE IF NOT EXISTS quran_sessions (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  teacher_id TEXT REFERENCES teachers(id),
  session_date TEXT DEFAULT (datetime('now')),
  surah_name TEXT NOT NULL,
  verses_from INTEGER NOT NULL,
  verses_to INTEGER NOT NULL,
  performance_rating INTEGER CHECK (performance_rating >= 1 AND performance_rating <= 10),
  notes TEXT,
  attendance INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_quran_sessions_student_id ON quran_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_quran_sessions_teacher_id ON quran_sessions(teacher_id);

CREATE TABLE IF NOT EXISTS tajweed_lessons (
  id TEXT PRIMARY KEY,
  teacher_id TEXT REFERENCES teachers(id),
  lesson_date TEXT DEFAULT (datetime('now')),
  topic TEXT NOT NULL,
  description TEXT NOT NULL,
  attendees TEXT DEFAULT '[]',
  resources TEXT DEFAULT '[]',
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_tajweed_lessons_teacher_id ON tajweed_lessons(teacher_id);

CREATE TABLE IF NOT EXISTS educational_sessions (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  teacher_id TEXT REFERENCES teachers(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  description TEXT NOT NULL,
  session_date TEXT DEFAULT (datetime('now')),
  performance_rating INTEGER CHECK (performance_rating >= 1 AND performance_rating <= 10),
  attendance INTEGER DEFAULT 1,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS meetings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  meeting_date TEXT NOT NULL,
  attendees TEXT DEFAULT '[]',
  agenda TEXT DEFAULT '[]',
  notes TEXT,
  status TEXT CHECK (status IN ('مجدولة', 'مكتملة', 'ملغاة')) DEFAULT 'مجدولة',
  type TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS suggestions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('تم', 'لم يتم')) DEFAULT 'لم يتم',
  suggested_by TEXT,
  priority TEXT CHECK (priority IN ('عالي', 'متوسط', 'منخفض')) DEFAULT 'متوسط',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS student_notes (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('إيجابي', 'سلبي')),
  content TEXT NOT NULL,
  note_date TEXT NOT NULL DEFAULT (date('now')),
  teacher_name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_student_notes_student_id ON student_notes(student_id);
CREATE INDEX IF NOT EXISTS idx_student_notes_date ON student_notes(note_date);

CREATE TABLE IF NOT EXISTS attendance_records (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
  teacher_id TEXT REFERENCES teachers(id) ON DELETE CASCADE,
  record_date TEXT NOT NULL DEFAULT (date('now')),
  status TEXT NOT NULL CHECK (status IN ('حاضر', 'غائب', 'مأذون')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_teacher_id ON attendance_records(teacher_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(record_date);
`;

export async function getDb(): Promise<Database> {
  if (db) return db;

  db = await Database.load("sqlite:eqraa.db");

  // Run migrations - split by semicolons and execute each statement
  const statements = SCHEMA.split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await db.execute(stmt);
  }

  // Add is_demo column to tables that need it (idempotent: ignore error if column exists)
  const demoColumnMigrations = [
    "ALTER TABLE teachers ADD COLUMN is_demo INTEGER NOT NULL DEFAULT 0",
    "ALTER TABLE students ADD COLUMN is_demo INTEGER NOT NULL DEFAULT 0",
    "ALTER TABLE attendance_records ADD COLUMN is_demo INTEGER NOT NULL DEFAULT 0",
    "ALTER TABLE quran_sessions ADD COLUMN is_demo INTEGER NOT NULL DEFAULT 0",
  ];
  for (const stmt of demoColumnMigrations) {
    try {
      await db.execute(stmt);
    } catch {
      // Column already exists — safe to ignore
    }
  }

  return db;
}

export async function closeDb(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}

export function uuid(): string {
  return crypto.randomUUID();
}
