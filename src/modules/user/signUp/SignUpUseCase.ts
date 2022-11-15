import { Result } from '@/common/Result';
import { User } from '@/entities/user';
import { IUserRepository } from '@/repository/IUserRepository';
import { SignUpDTO } from './SignUpDto';
import { SignUpErrors } from './SignUpErrors';

type SignUpResponse = SignUpErrors.UserAlreadyExistsError | Result<any> | Result<void>;

export class SignUpUseCase {
  private userRepo;
  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute(dto: SignUpDTO): Promise<SignUpResponse> {
    const { email, username } = dto;

    const doesUserAlreadyExist = await this.userRepo.exists(email, username);
    if (doesUserAlreadyExist) {
      return new SignUpErrors.UserAlreadyExistsError();
    }

    const userOrError = User.create(dto);
    if (userOrError.isFailure) {
      return Result.fail<User>(userOrError.getErrorValue().toString());
    }

    const user = userOrError.getValue();
    this.userRepo.create(user);

    return Result.ok<void>();
  }
}
