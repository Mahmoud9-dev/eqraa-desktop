import { useState, useCallback } from 'react'

interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
}

interface UsePaginationReturn {
  page: number
  pageSize: number
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  resetPage: () => void
}

export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const { initialPage = 1, initialPageSize = 50 } = options
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const nextPage = useCallback(() => setPage((p) => p + 1), [])
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), [])
  const goToPage = useCallback((target: number) => setPage(Math.max(1, target)), [])
  const resetPage = useCallback(() => setPage(1), [])

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size)
    setPage(1)
  }, [])

  return { page, pageSize, setPage, setPageSize, nextPage, prevPage, goToPage, resetPage }
}
