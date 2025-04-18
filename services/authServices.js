import bcrypt from 'bcrypt';

import User from '../db/models/users.js';

import HttpError from '../helpers/HttpError.js';

import { generateToken } from '../helpers/jwt.js';

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const signupUser = async (data) => {
  const { email, password, username } = data;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashPassword,
    username,
  });

  const token = generateToken({ id: newUser.id });

  await newUser.update({ token });

  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
    token,
  };
};

export const signinUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const payload = {
    id: user.id,
  };

  const token = generateToken(payload);

  await user.update({ token });

  return {
    token,
  };
};

export const logoutUser = async (id) => {
  const user = await findUser({ id });
  if (!user || !user.token) {
    throw HttpError(404, 'User not found');
  }

  await user.update({ token: null });
};
