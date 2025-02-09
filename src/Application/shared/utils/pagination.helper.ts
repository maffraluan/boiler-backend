export function toPaginatedResponse<T>(list: T[], total: number, params: PaginationParams): PaginatedResponse<T> {
  const { current_page, per_page } = params

  return {
    count: total,
    pages: Math.ceil(total / per_page),
    current_page: Number(current_page) == 0 ? 1 : Number(current_page),
    list,
  }
}

export function calcOffSet(params: PaginationParams): number {
  const { current_page, per_page } = params
  const page = current_page == 0 ? 1 : current_page
  const offset = (page - 1) * per_page
  return offset
}

export type PaginationParams = {
  current_page: number
  per_page: number
}

export type PaginatedResponse<T> = {
  count: number
  pages: number
  current_page: number
  list: T[]
}

export type SearchFiltersParams = {
  [key: string]: any
}
