import { Result } from '@/core/logic/Result';
import { User } from '@/entities/user';
import { SignUpUseCase } from '@/modules/user/signUp/SignUpUseCase';
import { SignUpErrors } from '@/modules/user/signUp/SignUpErrors';
import { UserRepositorySpy } from '../helpers/mock/repo/userRepositorySpy';
import { mockCreateUserData } from '../helpers/mock/data/userMock';

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

    const data = mockCreateUserData();
    await sut.execute(data);

    expect(userRepo.exists.mock.invocationCallOrder[0]).toBe(1);
    expect(userRepo.create.mock.invocationCallOrder[0]).toBe(2);
  });

  it('should validate if there is another user with same email and/or username', async () => {
    const { sut, userRepo } = makeSut();

    const data = mockCreateUserData();
    await sut.execute(data);

    expect(userRepo.exists).toHaveBeenCalledWith(data.email, data.username);
  });

  it('should return an error if there is another user with same email and/or username', async () => {
    const { sut, userRepo } = makeSut();
    userRepo.simulateUserAlreadyExists();

    const data = mockCreateUserData();
    const result = await sut.execute(data);

    expect(userRepo.exists).toBeCalled();
    expect(userRepo.create).not.toBeCalled();
    expect(result).toEqual(new SignUpErrors.UserAlreadyExistsError());
  });

  it('should pass User as parameter to insert in db', async () => {
    const { sut, userRepo } = makeSut();
    const data = mockCreateUserData();
    const user = User.create(data).getValue();

    jest.spyOn(User, 'create').mockReturnValueOnce(Result.ok<User>(user));

    const result = await sut.execute(data);

    expect(userRepo.create).toBeCalledWith(user);
    expect(result.isSuccess).toBe(true);
  });
});
