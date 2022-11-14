import { IUserRepository } from '@/repository/IUserRepository';
import { SignUpDTO } from './SignUpDto';

export class SignUpUseCase {
  private userRepo;
  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute(dto: SignUpDTO) {
    const { email, username } = dto;

    this.userRepo.exists(email, username);
    this.userRepo.create();
  }
}
