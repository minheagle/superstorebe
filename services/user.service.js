import * as bcrypt from "bcrypt";

import { userRepository } from "../repositories/index.js";
import Exception from "../exceptions/Exception.js";
import MESSAGE from "../constants/message.js";
import JWT from "../utils/jwt.js";

const registerService = async ({
  fullName,
  phone,
  email,
  passwordCtrl,
  role,
  address,
}) => {
  const checkEmail = await userRepository.existEmail(email);
  const checkPhone = await userRepository.existPhone(phone);
  if (checkEmail && checkPhone) {
    return new Exception(MESSAGE.USER.USER_EXITS);
  }
  const hashPassword = await bcrypt.hash(
    passwordCtrl,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await userRepository.registerRepo({
    fullName,
    phone,
    email,
    password: hashPassword,
    role,
    address,
  });
  if (newUser === null) throw new Exception(MESSAGE.USER.REGISTER_FAIL);

  const {
    password,
    refreshToken,
    isBanned,
    isBlocked,
    isActive,
    createdAt,
    updatedAt,
    __v,
    ...userDTO
  } = newUser._doc;
  return userDTO;
};

const loginService = async (email, passwordCtrl) => {
  const foundUser = await userRepository.loginRepo(email);
  const {
    password,
    refreshToken: refreshToken1,
    isBanned,
    isBlocked,
    isActive,
    createdAt,
    updatedAt,
    __v,
    ...userDTO
  } = foundUser._doc;
  if (!isActive) throw new Exception(MESSAGE.USER.USER_NOT_ACTIVE);
  if (isBlocked) throw new Exception(MESSAGE.USER.USER_BLOCKED);
  if (isBanned) throw new Exception(MESSAGE.USER.USER_BANNED);

  let isMatchPassword = await bcrypt.compare(passwordCtrl, foundUser.password);

  if (!isMatchPassword) {
    throw new Exception(MESSAGE.USER.LOGIN_FAIL);
  }

  const accessToken = JWT.generateAccessToken(userDTO._id, userDTO.role);
  const refreshToken = JWT.generateRefreshToken(userDTO._id, userDTO.role);
  await userRepository.updateRefreshTokenRepo(userDTO._id, refreshToken);

  return { accessToken, refreshToken, userDTO };
};

const getAllUserService = async () => {
  const listUser = await userRepository.getAllRepo();
  const listUserDTO = listUser.map((item) => {
    const { password, refreshToken, __v, ...userDTO } = item._doc;
    return userDTO;
  });
  return listUserDTO;
};

const getUserByIdService = async (id) => {
  const foundUser = await userRepository.getByIdRepo(id);
  if (foundUser === null) throw new Exception(MESSAGE.USER.GET_USER_BY_ID_FAIL);

  const {
    password,
    refreshToken,
    isBanned,
    isBlocked,
    isActive,
    createdAt,
    updatedAt,
    __v,
    ...userDTO
  } = foundUser._doc;

  return userDTO;
};

const getUserByIdForAdminService = async (id) => {
  const foundUser = await userRepository.getByIdRepo(id);
  if (foundUser === null) throw new Exception(MESSAGE.USER.GET_USER_BY_ID_FAIL);

  const { password, refreshToken, __v, ...userDTO } = foundUser._doc;

  return userDTO;
};

const updateForUserService = async ({
  id,
  fullName,
  phone,
  email,
  address,
}) => {
  const isCheckExist = await userRepository.existUser(id);
  if (!isCheckExist) throw new Exception(MESSAGE.USER.USER_NOT_FOUND);
  const isCheckExistEmail = await userRepository.existEmail(email);
  if (isCheckExistEmail) throw new Exception(MESSAGE.USER.USER_EXITS);
  const isCheckExistPhone = await userRepository.existPhone(phone);
  if (isCheckExistPhone) throw new Exception(MESSAGE.USER.USER_EXITS);

  await userRepository.updateRepo({
    id,
    fullName,
    phone,
    email,
    address,
  });
  const result = await userRepository.getByIdRepo(id);
  const {
    password,
    refreshToken,
    isBanned,
    isBlocked,
    isActive,
    __v,
    ...userDTO
  } = result._doc;
  return userDTO;
};

const updateForAdminService = async ({
  id,
  fullName,
  phone,
  email,
  address,
  role,
}) => {
  const isCheckExist = await userRepository.existUser(id);
  if (!isCheckExist) throw new Exception(MESSAGE.USER.USER_NOT_FOUND);
  const isCheckExistEmail = await userRepository.existEmail(email);
  if (isCheckExistEmail) throw new Exception(MESSAGE.USER.USER_EXITS);
  const isCheckExistPhone = await userRepository.existPhone(phone);
  if (isCheckExistPhone) throw new Exception(MESSAGE.USER.USER_EXITS);

  await userRepository.updateForAdminRepo({
    id,
    fullName,
    phone,
    email,
    address,
    role,
  });
  const result = await userRepository.getByIdRepo(id);
  const {
    password,
    refreshToken,
    isActive,
    isBanned,
    isBlocked,
    __v,
    ...userDTO
  } = result._doc;
  return userDTO;
};

const deleteUserService = async (id) => {
  const deleteUser = await userRepository.deleteRepo(id);
  if (deleteUser === null) throw new Exception(MESSAGE.USER.DELETE_USER_FAIL);
  const result = await userRepository.getByIdRepo(id);
  const {
    password,
    refreshToken,
    isActive,
    isBanned,
    isBlocked,
    __v,
    ...userDTO
  } = result._doc;
  return userDTO;
};

const unDeleteUserService = async (id) => {
  const isExistId = await userRepository.existId(id);
  if (!isExistId) throw new Exception(MESSAGE.USER.USER_BANNED);

  const unDeleteUser = await userRepository.unDeleteRepo(id);
  const {
    password,
    refreshToken,
    isActive,
    isBanned,
    isBlocked,
    __v,
    ...userDTO
  } = unDeleteUser._doc;
  return userDTO;
};

const setBannedService = async (id, stateBanned) => {
  const result = await userRepository.changeBannedRepo(id, stateBanned);
  if (result === null) throw new Exception(MESSAGE.USER.CHANGE_FAIL);
  const userChanged = await userRepository.getByIdRepo(id);
  const {
    password,
    refreshToken,
    isActive,
    isBanned,
    isBlocked,
    __v,
    ...userDTO
  } = userChanged._doc;
  return userDTO;
};

const setBlockedService = async (id, stateBlocked) => {
  const result = await userRepository.changeBlockedRepo(id, stateBlocked);
  if (result === null) throw new Exception(MESSAGE.USER.CHANGE_FAIL);
  const userChanged = await userRepository.getByIdRepo(id);
  const {
    password,
    refreshToken,
    isActive,
    isBanned,
    isBlocked,
    __v,
    ...userDTO
  } = userChanged._doc;
  return userDTO;
};

export default {
  registerService,
  loginService,
  getAllUserService,
  getUserByIdService,
  getUserByIdForAdminService,
  updateForUserService,
  updateForAdminService,
  deleteUserService,
  unDeleteUserService,
  setBannedService,
  setBlockedService,
};
