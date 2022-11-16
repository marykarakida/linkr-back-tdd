import { Result } from '@/core/logic/Result';

export namespace SignUpErrors {
  export class UserAlreadyExistsError extends Result<string> {
    constructor() {
      super({ isSuccess: false, error: 'Email and/or username are already beign used' });
    }
  }
}
