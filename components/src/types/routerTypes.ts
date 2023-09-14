interface Success<T> {
  type: 'success'
  value: T
}

interface Failure<E> {
  type: 'failure'
  error: E
}

export type Result<T, E> = Success<T> | Failure<E>

export type RouterEvent = CustomEvent<{ path: string }>

export interface RouterEventDetail {
  segment: string
}
