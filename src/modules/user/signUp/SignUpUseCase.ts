import { IUserRepository } from '@/repository/IUserRepository';

export class SignUpUseCase {
  private userRepo;
  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute() {
    this.userRepo.exists();
    this.userRepo.create();
  }
}
