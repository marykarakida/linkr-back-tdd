import bcrypt from 'bcrypt';
import { prisma } from '@/config/prisma';
import { mockCreateUserData } from '../mock/data/userMock';

export async function createOneUserScenario() {
  const data = mockCreateUserData();
  const userData = {
    ...data,
    password: bcrypt.hashSync(data.password, 10),
  };

  const insertedUser = await prisma.user.create({ data: userData });

  return { data, insertedUser };
}
