import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';

import authControllers from '../controllers/authControllers.js';

import validateBody from '../helpers/validateBody.js';

import { authSignupSchema, authSigninSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(authSignupSchema),
  authControllers.signupController
);

authRouter.post(
  '/login',
  validateBody(authSigninSchema),
  authControllers.signinController
);

authRouter.get('/current', authMiddleware, authControllers.getCurrentUser);

authRouter.post('/logout', authMiddleware, authControllers.logoutController);

export default authRouter;
