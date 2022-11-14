import { faker } from '@faker-js/faker';

export const mockSignUpData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.internet.userName(),
  pictureUrl: faker.internet.avatar(),
});
