import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  pictureUrl: Joi.string().required(),
});
