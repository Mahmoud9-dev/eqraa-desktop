import { getDb, uuid } from "../db";

export interface Teacher {
  id: string;
  name: string;
  specialization: string;
  department: string;
  is_active: number;
  email: string | null;
  phone: string | null;
  experience: number | null;
  created_at: string;
}

export async function getTeachers(): Promise<Teacher[]> {
  const db = await getDb();
  return db.select<Teacher[]>("SELECT * FROM teachers ORDER BY name");
}

export async function getTeachersByDept(department: string): Promise<Teacher[]> {
  const db = await getDb();
  return db.select<Teacher[]>(
    "SELECT * FROM teachers WHERE department = $1 ORDER BY name",
    [department]
  );
}

export async function getActiveTeachers(): Promise<Teacher[]> {
  const db = await getDb();
  return db.select<Teacher[]>(
    "SELECT * FROM teachers WHERE is_active = 1 ORDER BY name"
  );
}

export async function getTeacherCount(): Promise<number> {
  const db = await getDb();
  const result = await db.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM teachers WHERE is_active = 1"
  );
  return result[0]?.count ?? 0;
}

export async function addTeacher(teacher: {
  name: string;
  specialization: string;
  department: string;
  email?: string;
  phone?: string;
  experience?: number;
  is_active?: boolean;
}): Promise<void> {
  const db = await getDb();
  const id = uuid();
  await db.execute(
    "INSERT INTO teachers (id, name, specialization, department, email, phone, experience, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      id,
      teacher.name,
      teacher.specialization,
      teacher.department,
      teacher.email ?? null,
      teacher.phone ?? null,
      teacher.experience ?? null,
      teacher.is_active !== false ? 1 : 0,
    ]
  );
}

export async function updateTeacher(
  id: string,
  data: Partial<Omit<Teacher, "id" | "created_at">>
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
    `UPDATE teachers SET ${fields.join(", ")} WHERE id = $${idx}`,
    values
  );
}

export async function deleteTeacher(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM teachers WHERE id = $1", [id]);
}
