import { IUserRepository } from '@/repository/IUserRepository';

export class UserRepositorySpy implements IUserRepository {
  create = jest.fn();
}
