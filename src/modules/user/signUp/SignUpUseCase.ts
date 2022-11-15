import { IUserRepository } from '@/repository/IUserRepository';
import { Result } from '@/common/Result';
import { SignUpDTO } from './SignUpDto';
import { SignUpErrors } from './SignUpErrors';

type SignUpResponse = SignUpErrors.EmailAndOrUsernameAlreadyInUser | Result<void>;

export class SignUpUseCase {
  private userRepo;
  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute(dto: SignUpDTO): Promise<SignUpResponse> {
    const { email, username } = dto;

    const isEmailOrUsernameAlreadyInUse = await this.userRepo.exists(email, username);
    if (isEmailOrUsernameAlreadyInUse) {
      return new SignUpErrors.EmailAndOrUsernameAlreadyInUser();
    }

    this.userRepo.create();
    return Result.ok<void>();
  }
}
