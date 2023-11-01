export interface FetchArgs extends Omit<RequestInit, 'body'> {
  path?: string
  body?: Record<string, unknown>
}
