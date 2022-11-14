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
  it('should not create a user on sut creation', () => {
    const { userRepo } = makeSut();
    expect(userRepo.create).not.toHaveBeenCalled();
  });

  it('should validate if user exists before creating user', async () => {
    const { sut, userRepo } = makeSut();
    await sut.execute();
    expect(userRepo.exists.mock.invocationCallOrder[0]).toBe(1);
    expect(userRepo.create.mock.invocationCallOrder[0]).toBe(2);
  });
});
