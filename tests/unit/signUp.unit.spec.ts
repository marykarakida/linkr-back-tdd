import { SignUpUseCase } from '@/modules/user/signUp/SignUpUseCase';
import { UserRepositorySpy } from '../helpers/mock/repo/userRepositorySpy';
import { mockSignUpData } from '../helpers/mock/data/userMock';

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
    const data = mockSignUpData();
    await sut.execute(data);
    expect(userRepo.exists.mock.invocationCallOrder[0]).toBe(1);
    expect(userRepo.create.mock.invocationCallOrder[0]).toBe(2);
  });

  it('should validate if there is another user with same email and/or username', async () => {
    const { sut, userRepo } = makeSut();
    const data = mockSignUpData();
    await sut.execute(data);
    expect(userRepo.exists).toHaveBeenCalledWith(data.email, data.username);
  });
});
