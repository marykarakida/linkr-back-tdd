import supertest from 'supertest';

import app, { init, close } from '@/app';
import { mockCreateUserData } from '../helpers/mock/data/userMock';

const server = supertest(app);

describe('Auth routes', () => {
  beforeEach(() => {
    init();
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
  });
});
