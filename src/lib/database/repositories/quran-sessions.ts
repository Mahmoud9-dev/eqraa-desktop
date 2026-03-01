import { getDb, uuid } from "../db";

export interface QuranSession {
  id: string;
  student_id: string;
  teacher_id: string | null;
  session_date: string;
  surah_name: string;
  verses_from: number;
  verses_to: number;
  performance_rating: number | null;
  notes: string | null;
  attendance: number;
  created_at: string;
}

export interface QuranSessionWithStudent extends QuranSession {
  student_name: string | null;
}

export async function getQuranSessions(): Promise<QuranSessionWithStudent[]> {
  const db = await getDb();
  return db.select<QuranSessionWithStudent[]>(
    `SELECT qs.*, s.name as student_name
     FROM quran_sessions qs
     LEFT JOIN students s ON qs.student_id = s.id
     ORDER BY qs.session_date DESC`
  );
}

export async function addQuranSession(session: {
  student_id: string;
  teacher_id?: string | null;
  surah_name: string;
  verses_from: number;
  verses_to: number;
  performance_rating?: number;
}): Promise<void> {
  const db = await getDb();
  const id = uuid();
  await db.execute(
    "INSERT INTO quran_sessions (id, student_id, teacher_id, surah_name, verses_from, verses_to, performance_rating) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      id,
      session.student_id,
      session.teacher_id ?? null,
      session.surah_name,
      session.verses_from,
      session.verses_to,
      session.performance_rating ?? null,
    ]
  );
}
