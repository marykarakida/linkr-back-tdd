import { Prisma } from '@prisma/client';
import { User } from '@/entities/user';

export class UserMap {
  public static toPersistance(user: User): Prisma.UserUncheckedCreateInput {
    let password: string;
    if (user.isPasswordHashed()) {
      password = user.password;
    } else {
      password = user.getHashedPassword();
    }

    return {
      email: user.email,
      password,
      username: user.username,
      pictureUrl: user.pictureUrl,
    };
  }
}
