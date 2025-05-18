import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  favorite: Joi.boolean(),
  avatarURL: Joi.string(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phoneNumber: Joi.string(),
  favorite: Joi.boolean(),
}).min(1);
