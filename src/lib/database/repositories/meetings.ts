import { getDb, uuid } from "../db";
import { PaginationParams, paginationClause, computeTotalPages } from "@/lib/database/pagination";
import type { PaginatedResponse } from "@/types";

export interface Meeting {
  id: string;
  title: string;
  description: string;
  meeting_date: string;
  attendees: string;
  agenda: string;
  notes: string | null;
  status: string;
  type: string | null;
  created_at: string;
}

export async function getMeetings(): Promise<Meeting[]> {
  const db = await getDb();
  return db.select<Meeting[]>(
    "SELECT * FROM meetings ORDER BY meeting_date DESC"
  );
}

export async function getUpcomingMeetingCount(): Promise<number> {
  const db = await getDb();
  const today = new Date().toISOString().split("T")[0];
  const result = await db.select<{ count: number }[]>(
    "SELECT COUNT(*) as count FROM meetings WHERE meeting_date >= $1 AND status = 'مجدولة'",
    [today]
  );
  return result[0]?.count ?? 0;
}

export async function addMeeting(meeting: {
  title: string;
  description: string;
  meeting_date: string;
  status?: string;
  type?: string;
}): Promise<void> {
  const db = await getDb();
  const id = uuid();
  await db.execute(
    "INSERT INTO meetings (id, title, description, meeting_date, status, type) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      id,
      meeting.title,
      meeting.description,
      meeting.meeting_date,
      meeting.status ?? "مجدولة",
      meeting.type ?? null,
    ]
  );
}

export async function updateMeetingStatus(
  id: string,
  status: string
): Promise<void> {
  const db = await getDb();
  await db.execute("UPDATE meetings SET status = $1 WHERE id = $2", [
    status,
    id,
  ]);
}

export async function deleteMeeting(id: string): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM meetings WHERE id = $1", [id]);
}

export async function getMeetingsPaginated(
  params: PaginationParams
): Promise<PaginatedResponse<Meeting>> {
  const db = await getDb();
  const { clause } = paginationClause(params);

  const countResult = await db.select<[{ count: number }]>(
    "SELECT COUNT(*) as count FROM meetings"
  );
  const total = countResult[0].count;

  const data = await db.select<Meeting[]>(
    `SELECT * FROM meetings ORDER BY meeting_date DESC ${clause}`
  );

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: computeTotalPages(total, params.pageSize),
  };
}
