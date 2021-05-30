export type Nullable<T> = T | null

export interface Action<T = any, C = any> {
  type: string
  payload: T
  callback?: C
}
