import { Prisma } from '@prisma/client';
import { User } from '@/entities/user';

export class UserMap {
  public static toPersistance(user: User): Prisma.UserUncheckedCreateInput {
    return {
      email: user.email,
      password: user.password,
      username: user.username,
      pictureUrl: user.pictureUrl,
    };
  }
}
