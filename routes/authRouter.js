import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';

import authControllers from '../controllers/authControllers.js';

import { validateBody } from '../decorators/validateBody.js';

import {
  authSignupSchema,
  authSigninSchema,
  authVerifySchema,
} from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.get('/verify/:verificationCode', authControllers.verifyController);
authRouter.get('/current', authMiddleware, authControllers.getCurrentUser);
authRouter.post(
  '/verify',
  validateBody(authVerifySchema),
  authControllers.resendVerifyEmailController
);

authRouter.post('/logout', authMiddleware, authControllers.logoutController);
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
authRouter.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  authControllers.updateAvatar
);

export default authRouter;
