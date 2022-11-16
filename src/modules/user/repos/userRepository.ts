import { prisma } from '@/config/prisma';
import { User } from '@/modules/user/domain';
import { UserMap } from '@/modules/user/mappers/userMap';

export interface IUserRepository {
  create: (user: User) => Promise<void>;
  exists: (email: string, name: string) => Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  async exists(email: string, username: string): Promise<boolean> {
    const userWithSameEmail = await prisma.user.findUnique({ where: { email } });
    const userWithSameUsername = await prisma.user.findUnique({ where: { username } });

    if (userWithSameEmail || userWithSameUsername) {
      return true;
    }

    return false;
  }

  async create(user: User): Promise<void> {
    const userData = UserMap.toPersistance(user);
    await prisma.user.create({ data: userData });
  }
}
