import Joi from 'joi';
import { emailRegexp, passwordRegexp } from '../constants/auth.js';

export const authSignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required().min(8),
  subscription: Joi.string(),
});

export const authSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});
