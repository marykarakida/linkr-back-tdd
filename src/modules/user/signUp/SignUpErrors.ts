import { Result } from '@/common/Result';

export namespace SignUpErrors {
  export class UserAlreadyExistsError extends Result<string> {
    constructor() {
      super({ isSuccess: false, error: 'Email and/or username are already beign used' });
    }
  }
}
