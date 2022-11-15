import { Result } from '@/common/Result';
import { Entity } from '../Entity';
import { createUserSchema } from './userSchema';

interface UserProps {
  email: string;
  password: string;
  username: string;
  pictureUrl: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  public static create(props: UserProps) {
    const { error } = createUserSchema.validate(props, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return Result.fail<User>(messages);
    }

    const user = new User({ ...props });

    return Result.ok<User>(user);
  }
}
