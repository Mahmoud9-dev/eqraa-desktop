export interface PaginationParams {
  page: number
  pageSize: number
}

const DEFAULT_PAGE_SIZE = 50

export function paginationClause(params?: PaginationParams): {
  clause: string
  limit: number
  offset: number
} {
  const page = Math.max(1, params?.page ?? 1)
  const pageSize = params?.pageSize ?? DEFAULT_PAGE_SIZE
  const offset = (page - 1) * pageSize
  return {
    clause: `LIMIT ${pageSize} OFFSET ${offset}`,
    limit: pageSize,
    offset,
  }
}

export function computeTotalPages(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize))
}
