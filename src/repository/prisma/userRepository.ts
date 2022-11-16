import { prisma } from '@/config/prisma';
import { User } from '@/entities/user';
import { UserMap } from '@/mappers/userMap';
import { IUserRepository } from '../IUserRepository';

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
