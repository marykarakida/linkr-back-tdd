import { User } from '@/entities/user';

export interface IUserRepository {
  create: (user: User) => Promise<void>;
  exists: (email: string, name: string) => Promise<boolean>;
}
