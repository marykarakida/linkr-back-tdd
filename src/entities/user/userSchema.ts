import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  pictureUrl: Joi.string().uri().trim().required(),
});
