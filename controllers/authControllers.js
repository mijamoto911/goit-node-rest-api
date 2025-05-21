import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Jimp = require('jimp');

import * as authServices from '../services/authServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

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

const updateAvatar = async (req, res, next) => {
  const { file, user } = req;

  console.log('⚡️ updateAvatar запущено');
  if (!file) {
    return next(HttpError(400, 'No file uploaded'));
  }

  const tempPath = file.path;
  const avatarsDir = path.resolve('public/avatars');
  const filename = `${user.id}_${Date.now()}_${file.originalname}`;
  const finalPath = path.join(avatarsDir, filename);

  try {
    const image = await Jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(finalPath);
    await fs.unlink(tempPath);

    const oldAvatar = user.avatarURL;
    if (oldAvatar?.startsWith('/avatars/')) {
      const oldPath = path.join(avatarsDir, path.basename(oldAvatar));
      await fs.unlink(oldPath).catch(() => {});
    }

    const avatarURL = `/avatars/${filename}`;
    await user.update({ avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    console.error('❌ updateAvatar error:', error.message);
    try {
      await fs.unlink(tempPath);
    } catch (_) {}
    next(HttpError(500, 'Avatar update failed'));
  }
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
  updateAvatar: ctrlWrapper(updateAvatar),
};
