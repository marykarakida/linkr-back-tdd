interface ResultProps {
  isSuccess: boolean;
  error?: any;
  value?: any;
}

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: T | undefined;
  private value: T | undefined;

  public constructor(props: ResultProps) {
    const { isSuccess, error, value } = props;

    if (isSuccess && error) {
      throw new Error('A result cannot be successful and contain an error');
    }
    if (!isSuccess && !error) {
      throw new Error('A result cannot be failure and not contain an error');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    if (this.isSuccess) this.value = value;
    if (this.isFailure) this.error = error;

    Object.freeze(this);
  }

  public getValue(): T {
    if (this.isFailure) {
      throw new Error('Cannot get value if result is a failure');
    }
    return this.value as T;
  }

  public getErrorValue(): T {
    if (this.isSuccess) {
      throw new Error('Cannot get error value if result is a success');
    }
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result({ isSuccess: true, value });
  }

  public static fail<U>(error?: string): Result<U> {
    return new Result({ isSuccess: false, error });
  }
}
