import { getDb, uuid } from "../db";

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  teacher_id: string | null;
  department: string;
  parts_memorized: number;
  current_progress: string | null;
  previous_progress: string | null;
  is_active: number;
  parent_name: string | null;
  parent_phone: string | null;
  attendance: number;
  images: string;
  created_at: string;
}

export interface StudentWithTeacher extends Student {
  teacher_name: string | null;
}

export async function getStudents(): Promise<Student[]> {
  const db = await getDb();
  return db.select<Student[]>("SELECT * FROM students ORDER BY name LIMIT 500");
}

export async function getActiveStudents(): Promise<Student[]> {
  const db = await getDb();
  return db.select<Student[]>(
    "SELECT * FROM students WHERE is_active = 1 ORDER BY name LIMIT 500"
  );
}

export async function getStudentsByDept(department: string): Promise<StudentWithTeacher[]> {
  const db = await getDb();
  return db.select<StudentWithTeacher[]>(
    `SELECT s.*, t.name as teacher_name
     FROM students s
     LEFT JOIN teachers t ON s.teacher_id = t.id
     WHERE s.department = $1
     ORDER BY s.name LIMIT 500`,
    [department]
  );
}

export async function getStudentsWithTeachers(): Promise<StudentWithTeacher[]> {
  const db = await getDb();
  return db.select<StudentWithTeacher[]>(
    `SELECT s.*, t.name as teacher_name
     FROM students s
     LEFT JOIN teachers t ON s.teacher_id = t.id
     ORDER BY s.name LIMIT 500`
  );
}

export async function getStudentCount(): Promise<number> {
  const db = await getDb();
  const result = await db.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM students WHERE is_active = 1"
  );
  return result[0]?.count ?? 0;
}

export async function getAttendanceAverage(): Promise<number> {
  const db = await getDb();
  const result = await db.select<{ avg: number | null }[]>(
    "SELECT AVG(attendance) as avg FROM students WHERE is_active = 1 AND attendance IS NOT NULL"
  );
  return Math.round(result[0]?.avg ?? 0);
}

export async function addStudent(student: {
  name: string;
  age: number;
  grade: string;
  department: string;
  teacher_id?: string | null;
  parts_memorized?: number;
  current_progress?: string;
  previous_progress?: string;
  parent_name?: string;
  parent_phone?: string;
  is_active?: boolean;
}): Promise<void> {
  const db = await getDb();
  const id = uuid();
  await db.execute(
    `INSERT INTO students (id, name, age, grade, department, teacher_id, parts_memorized, current_progress, previous_progress, parent_name, parent_phone, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [
      id,
      student.name,
      student.age,
      student.grade,
      student.department,
      student.teacher_id ?? null,
      student.parts_memorized ?? 0,
      student.current_progress ?? null,
      student.previous_progress ?? null,
      student.parent_name ?? null,
      student.parent_phone ?? null,
      student.is_active !== false ? 1 : 0,
    ]
  );
}

export async function updateStudent(
  id: string,
  data: Partial<Omit<Student, "id" | "created_at">>
): Promise<void> {
  const db = await getDb();
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = $${idx}`);
      values.push(key === "is_active" ? (value ? 1 : 0) : value);
      idx++;
    }
  }

  if (fields.length === 0) return;
  values.push(id);
  await db.execute(
    `UPDATE students SET ${fields.join(", ")} WHERE id = $${idx}`,
    values
  );
}

export async function deleteStudent(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM students WHERE id = $1", [id]);
}
