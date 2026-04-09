import { getDb, uuid } from "../db";
import { PaginationParams, paginationClause, computeTotalPages } from "@/lib/database/pagination";
import type { PaginatedResponse } from "@/types";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: string;
  suggested_by: string | null;
  priority: string;
  created_at: string;
}

export async function getSuggestions(): Promise<Suggestion[]> {
  const db = await getDb();
  return db.select<Suggestion[]>(
    "SELECT * FROM suggestions ORDER BY created_at DESC"
  );
}

export async function addSuggestion(suggestion: {
  title: string;
  description: string;
  suggested_by?: string;
  priority?: string;
  status?: string;
}): Promise<void> {
  const db = await getDb();
  const id = uuid();
  await db.execute(
    "INSERT INTO suggestions (id, title, description, suggested_by, priority, status) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      id,
      suggestion.title,
      suggestion.description,
      suggestion.suggested_by ?? null,
      suggestion.priority ?? "متوسط",
      suggestion.status ?? "لم يتم",
    ]
  );
}

export async function updateSuggestionStatus(
  id: string,
  status: string
): Promise<void> {
  const db = await getDb();
  await db.execute("UPDATE suggestions SET status = $1 WHERE id = $2", [
    status,
    id,
  ]);
}

export async function getSuggestionsPaginated(
  params: PaginationParams
): Promise<PaginatedResponse<Suggestion>> {
  const db = await getDb();
  const { clause } = paginationClause(params);

  const countResult = await db.select<[{ count: number }]>(
    "SELECT COUNT(*) as count FROM suggestions"
  );
  const total = countResult[0].count;

  const data = await db.select<Suggestion[]>(
    `SELECT * FROM suggestions ORDER BY created_at DESC ${clause}`
  );

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: computeTotalPages(total, params.pageSize),
  };
}
