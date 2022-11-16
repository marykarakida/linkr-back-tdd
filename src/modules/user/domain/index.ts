import bcrypt from 'bcrypt';
import { Result } from '@/core/logic/Result';
import { Entity } from '../../../core/domain/Entity';
import { createUserSchema } from './userSchema';

interface UserProps {
  email: string;
  password: string;
  username: string;
  pictureUrl: string;
  isPwdHashed?: boolean;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get username() {
    return this.props.username;
  }

  get pictureUrl() {
    return this.props.pictureUrl;
  }

  private constructor(props: UserProps) {
    super(props);
  }

  public isPasswordHashed(): boolean {
    return !!this.props.isPwdHashed;
  }

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  }

  public getHashedPassword() {
    if (this.isPasswordHashed()) {
      return this.password;
    }

    const hashed = this.hashPassword(this.password);

    return hashed;
  }

  public static create(props: UserProps) {
    const { error } = createUserSchema.validate(props, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return Result.fail<User>(messages);
    }

    const user = new User({ ...props, isPwdHashed: !!props?.isPwdHashed });

    return Result.ok<User>(user);
  }
}
