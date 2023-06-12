import { User } from "../models/index.js";

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

const updateRepo = async ({ id, fullName, phone, email, address }) => {
  const editUser = await User.findByIdAndUpdate(id, {
    fullName,
    phone,
    email,
    address,
  });
  if (editUser === null) {
    throw new Exception(MESSAGE.USER.UPDATE_USER_FAIL);
  }
  return editUser;
};

const updateForAdminRepo = async ({
  id,
  fullName,
  phone,
  email,
  address,
  role,
}) => {
  const result = await User.findByIdAndUpdate(id, {
    fullName,
    phone,
    email,
    address,
    role,
  });
  if (result === null) throw new Exception(MESSAGE.USER.UPDATE_USER_FAIL);

  return result;
};

const updateRefreshTokenRepo = async (id, refreshToken) => {
  await User.findByIdAndUpdate(id, { refreshToken });
};

const changeBannedRepo = async (id, stateBanned) => {
  return await User.findByIdAndUpdate(id, { isBanned: stateBanned });
};

const changeBlockedRepo = async (id, stateBlocked) => {
  return await User.findByIdAndUpdate(id, { isBlocked: stateBlocked });
};

const changePassword = async (id, password) => {
  return await User.findByIdAndUpdate(id, { password });
};

const deleteRepo = async (id) => {
  return await User.findByIdAndUpdate(id, { isActive: false });
};

const unDeleteRepo = async (id) => {
  return await User.findByIdAndUpdate(id, { isActive: true });
};

const existId = async (id) => {
  const foundUser = await User.findById(id);
  if (foundUser === null) {
    return false;
  }
  return true;
};

const existEmail = async (email) => {
  const foundUser = await User.findOne({ email }).exec();
  if (foundUser === null) {
    return false;
  }
  return true;
};

const existPhone = async (phone) => {
  const foundUser = await User.findOne({ phone }).exec();
  if (foundUser === null) {
    return false;
  }
  return true;
};

const existUser = async (id) => {
  const foundUser = await User.findById(id);
  if (foundUser === null) {
    return false;
  }
  return true;
};

export default {
  registerRepo,
  loginRepo,
  getAllRepo,
  getByIdRepo,
  updateRepo,
  updateForAdminRepo,
  updateRefreshTokenRepo,
  deleteRepo,
  unDeleteRepo,
  changeBannedRepo,
  changeBlockedRepo,
  existId,
  existEmail,
  existPhone,
  changePassword,
  existUser,
};
