import express from 'express';
import validateBody from '../decorators/validateBody.js';
import authControllers from '../controllers/authControllers.js';
import { authSigninSchema, authSignupSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();
authRouter.post(
  '/signup',
  validateBody(authSignupSchema),
  authControllers.signupController
);
authRouter.post(
  '/signin',
  validateBody(authSigninSchema),
  authControllers.signinController
);
export default authRouter;
