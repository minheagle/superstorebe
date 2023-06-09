import { User } from "../models/index.js";
import bcrypt from "bcrypt";

import Exception from "../exceptions/Exception.js";
import MESSAGE from "../constants/message.js";

const registerRepo = async ({
  fullName,
  phone,
  email,
  password,
  role,
  address,
}) => {
  const existUser = await User.findOne({ email }).exec();
  if (existUser) {
    throw new Exception(MESSAGE.USER_EXITS);
  }

  const newUser = await User.create({
    fullName,
    phone,
    email,
    password,
    role,
    address,
  });
  return newUser;
};

const loginRepo = async (email) => {
  const existUser = await User.findOne({ email }).exec();
  if (existUser === null) {
    throw new Exception(MESSAGE.USER.LOGIN_FAIL);
  }

  return existUser;
};

const getAllRepo = async () => {
  const listUser = await User.find();
  if (listUser === null) {
    throw new Exception(MESSAGE.USER.GET_ALL_USER_FAIL);
  }

  return listUser;
};

const getByIdRepo = async (id) => {
  const findUser = await User.findById(id).exec();
  if (findUser === null) {
    throw new Exception(MESSAGE.USER_NOT_FOUND);
  }
  return findUser;
};

const updateRepo = async ({ id, fullName, phone }) => {
  const editUser = await User.findByIdAndUpdate(id, {
    fullName: fullName,
    phone: phone,
  });
  if (editUser === null) {
    throw new Exception(MESSAGE.USER_NOT_FOUND);
  }
  return editUser;
};

const updateRefreshTokenRepo = async (id, refreshToken) => {
  await User.findByIdAndUpdate(id, { refreshToken });
};

const deleteRepo = async (id) => {
  const deleteUser = await User.findByIdAndDelete(id).exec();
  if (deleteUser === null) {
    throw new Exception(MESSAGE.USER_NOT_FOUND);
  }
  return deleteUser;
};

export default {
  registerRepo,
  loginRepo,
  getAllRepo,
  getByIdRepo,
  updateRepo,
  updateRefreshTokenRepo,
  deleteRepo,
};
