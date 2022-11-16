import { IUserRepository } from '@/modules/user/repos/userRepository';

export class UserRepositorySpy implements IUserRepository {
  private existsResult: boolean = false;

  create = jest.fn();
  exists = jest.fn(() => Promise.resolve(this.existsResult));

  simulateUserAlreadyExists() {
    this.existsResult = true;
  }
}
