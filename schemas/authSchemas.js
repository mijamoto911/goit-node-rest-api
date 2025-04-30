import Joi from 'joi';
import { emailRegexp, passwordRegexp } from '../constants/auth.js';

export const authSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});

export const authVerifySchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  verificationToken: Joi.string().required(),
});

export const authSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});
