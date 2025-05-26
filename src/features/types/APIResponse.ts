export type APIResponse<T = unknown> = {
  error: boolean,
  status: number,
  data: {
    rows: T[],
    count: number
  } & Record<string, any>
};