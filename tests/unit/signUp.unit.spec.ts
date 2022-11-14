import { SignUpUseCase } from '@/modules/user/signUp/SignUpUseCase';
import { UserRepositorySpy } from '../helpers/mock/repo/userRepositorySpy';

type SutTypes = {
  sut: SignUpUseCase;
  userRepo: UserRepositorySpy;
};

const makeSut = (): SutTypes => {
  const userRepo = new UserRepositorySpy();
  const sut = new SignUpUseCase(userRepo);
  return { sut, userRepo };
};

describe('SignUp UseCase', () => {
  it('should not create a user on sut initialization', () => {
    const { userRepo } = makeSut();
    expect(userRepo.create).not.toHaveBeenCalled();
  });
});
