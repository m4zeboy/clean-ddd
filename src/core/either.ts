export class Failure<F> {
  readonly reason: F

  constructor(reason: F) {
    this.reason = reason
  }
}

export class Success<S> {
  readonly value: S

  constructor(value: S) {
    this.value = value
  }
}

export type Either<F, S> = Failure<F> | Success<S>

export const failure = <F, S>(reason: F): Either<F, S> => {
  return new Failure(reason)
}

export const success = <F, S>(value: S): Either<F, S> => {
  return new Success(value)
}
