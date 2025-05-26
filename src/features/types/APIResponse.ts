export type APIResponse<T> = {
  error: boolean,
  status: number,
  data: {
    rows: T[],
    count: number
  }
};