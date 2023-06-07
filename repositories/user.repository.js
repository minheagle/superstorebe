import { User } from "../models/index.js";
import bcrypt from "bcrypt";

import Exception from "../exceptions/Exception.js";
import MESSAGE from "../constants/message.js";

const registerRepo = async ({ email, password, fullName, phone }) => {
  const existUser = await User.findOne({ email }).exec();
  if (existUser) {
    throw new Exception(MESSAGE.USER_EXITS);
  }
  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await User.create({
    fullName,
    phone,
    email,
    password: hashPassword,
  });
  return newUser;
};

const loginRepo = async ({ email, password }) => {
  const existUser = await User.findOne({ email }).exec();
  if (existUser === null) {
    throw new Exception(MESSAGE.LOGIN_FAIL);
  }
  let isMatchPassword = await bcrypt.compare(password, existUser.password);
  if (isMatchPassword) {
    return existUser;
  }
};

const getAllRepo = async () => {
  const listUser = await User.find();
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
  deleteRepo,
};
