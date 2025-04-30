import * as authServices from '../services/authServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

const signupController = async (req, res) => {
  const { user, token } = await authServices.signupUser(req.body);

  res.status(201).json({
    user,
  });
};

const verifyController = async (req, res) => {
  const { verificationCode } = req.params;
  await authServices.verifyUser(verificationCode);

  res.json({
    message: 'Email verified successfully',
  });
};

const resendVerifyEmailController = async (req, res) => {
  const { email } = req.body;
  await authServices.resendVerifyEmail(email);

  res.json({
    message: 'Verify email resend',
  });
};

const signinController = async (req, res) => {
  const { token, user } = await authServices.signinUser(req.body);

  res.json({
    token,
    user,
  });
};
const logoutController = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await user.update({ token: null });

  res.status(204).send();
};
const getCurrentUser = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

export default {
  signupController: ctrlWrapper(signupController),
  signinController: ctrlWrapper(signinController),
  logoutController: ctrlWrapper(logoutController),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  verifyController: ctrlWrapper(verifyController),
  resendVerifyEmailController: ctrlWrapper(resendVerifyEmailController),
};
