import { Result } from '@/common/Result';

export namespace SignUpErrors {
  export class EmailAndOrUsernameAlreadyInUser extends Result<any> {
    constructor() {
      super({ isSuccess: false, error: 'Email and/or username are already beign used' });
    }
  }
}
