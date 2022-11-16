import supertest from 'supertest';

import app, { init, close } from '@/app';
import { mockCreateUserData } from '../helpers/mock/data/userMock';
import { cleanDb } from '../helpers/scenarios';
import { createOneUserScenario } from '../helpers/scenarios/userScenario';

const server = supertest(app);

describe('Auth routes', () => {
  beforeEach(() => {
    init();
    cleanDb();
  });

  afterAll(() => {
    close();
  });

  describe('POST /auth/sign-up', () => {
    it('should return 201 if user is created', async () => {
      const data = mockCreateUserData();

      const response = await server.post('/auth/sign-up').send(data);

      expect(response.statusCode).toBe(201);
    });

    it('should return 409 if there is another account using the same email', async () => {
      const { data } = await createOneUserScenario();

      const response = await server
        .post('/auth/sign-up')
        .send({ ...data, username: 'any_other_username' });

      expect(response.statusCode).toBe(409);
    });

    it('should return 409 if the username is already taken', async () => {
      const { data } = await createOneUserScenario();

      const response = await server
        .post('/auth/sign-up')
        .send({ ...data, email: 'any_other_email@email.com' });

      expect(response.statusCode).toBe(409);
    });
  });
});
