import { User } from '@/entities/user';
import { createUserSchema } from '@/entities/user/userSchema';
import { mockCreateUserData } from '../../helpers/mock/data/userMock';

describe('User Entity', () => {
  it('should ensure that data passed on to create User is validated', () => {
    const data = {
      email: '',
      password: '',
      username: '',
      pictureUrl: '',
    };

    jest.spyOn(createUserSchema, 'validate');

    const user = User.create(data);

    expect(user).not.toBeInstanceOf(User);
    expect(createUserSchema.validate).toBeCalledWith(data, { abortEarly: false });
  });

  it('should not create a User Entity if any field is an empty string', () => {
    const data = {
      email: '',
      password: '',
      username: '',
      pictureUrl: '',
    };

    const user = User.create(data);

    expect(user).not.toBeInstanceOf(User);
    expect(user.getErrorValue()).toHaveLength(4);
  });

  it('should not create a User Entity if email is not valid', () => {
    const data = mockCreateUserData();

    const user = User.create({ ...data, email: 'not an email' });

    expect(user).not.toBeInstanceOf(User);
    expect(user.getErrorValue()).toHaveLength(1);
  });

  it('should not create a User Entity if pictureUrl is not a valid uri', () => {
    const data = mockCreateUserData();

    const user = User.create({ ...data, pictureUrl: 'not a pictureUrl' });

    expect(user).not.toBeInstanceOf(User);
    expect(user.getErrorValue()).toHaveLength(1);
  });
});