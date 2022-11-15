import { IUserRepository } from '@/repository/IUserRepository';
import { Result } from '@/common/Result';
import { SignUpDTO } from './SignUpDto';
import { SignUpErrors } from './SignUpErrors';

type SignUpResponse = SignUpErrors.UserAlreadyExistsError | Result<void>;

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

    this.userRepo.create();
    return Result.ok<void>();
  }
}
