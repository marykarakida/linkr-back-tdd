import { IUserRepository } from '@/repository/IUserRepository';
import { SignUpDTO } from './SignUpDto';
import { SignUpErrors } from './SignUpErrors';

export class SignUpUseCase {
  private userRepo;
  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute(dto: SignUpDTO): Promise<any> {
    const { email, username } = dto;

    const isEmailOrUsernameAlreadyInUse = await this.userRepo.exists(email, username);
    if (isEmailOrUsernameAlreadyInUse) {
      return new SignUpErrors.EmailAndOrUsernameAlreadyInUser();
    }

    this.userRepo.create();
    return 'ok';
  }
}
