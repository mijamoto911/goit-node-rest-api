import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import User from '../db/models/users.js';
import HttpError from '../helpers/HttpError.js';
import { generateToken } from '../helpers/jwt.js';
import sendEmail from '../helpers/sendEmail.js';

const { APP_DOMAIN } = process.env;

const createVerifyEmail = (email, verificationCode) => ({
  to: email,
  subject: 'Verify email',
  html: `<a href="${APP_DOMAIN}/api/auth/verify/${verificationCode}" target="_blank">Click to verify email</a>`,
});

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const signupUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: '250', d: 'retro' }, true);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...data,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = createVerifyEmail(email, verificationCode);
  await sendEmail(verifyEmail);

  return {
    user: {
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      subscription: newUser.subscription,
      verify: newUser.verify,
    },
    token: null,
  };
};

export const verifyUser = async (verificationCode) => {
  const user = await findUser({ verificationCode });

  if (!user) {
    throw HttpError(404, 'Email not found or already verified');
  }

  await user.update({
    verificationCode: null,
    verify: true,
  });
};

export const resendVerifyEmail = async (email) => {
  const user = await findUser({ email });

  if (!user) {
    throw HttpError(404, 'Email not found');
  }

  if (user.verify) {
    throw HttpError(401, 'Email already verified');
  }

  const verifyEmail = createVerifyEmail(email, user.verificationCode);
  await sendEmail(verifyEmail);
};

export const signinUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  if (!user.verify) {
    throw HttpError(401, 'Email not verified');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const token = generateToken({ id: user.id });
  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = async (id) => {
  const user = await findUser({ id });
  if (!user || !user.token) {
    throw HttpError(404, 'User not found');
  }

  await user.update({ token: null });
};
