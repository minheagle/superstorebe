import * as bcrypt from "bcrypt";

import { userRepository } from "../repositories/index.js";
import Exception from "../exceptions/Exception.js";
import MESSAGE from "../constants/message.js";
import JWT from "../utils/jwt.js";

const registerService = async ({
  fullNameCtrl,
  phoneCtrl,
  emailCtrl,
  passwordCtrl,
  roleCtrl,
  addressCtrl,
}) => {
  debugger;
  const hashPassword = await bcrypt.hash(
    passwordCtrl,
    parseInt(process.env.SALT_ROUNDS)
  );
  debugger;
  if (hashPassword) throw new Exception("Bi loi hash");
  const newUser = await userRepository.registerRepo({
    fullName: fullNameCtrl,
    phone: phoneCtrl,
    email: emailCtrl,
    password: hashPassword,
    role: roleCtrl,
    address: addressCtrl,
  });
  debugger;
  if (newUser === null) throw new Exception(MESSAGE.USER.REGISTER_FAIL);
  console.log(newUser);

  const { password, createdAt, updatedAt, __v, ...userDTO } = newUser._doc;
  return userDTO;
};

const loginService = async (email, passwordCtrl) => {
  const foundUser = await userRepository.loginRepo(email);
  let isMatchPassword = await bcrypt.compare(passwordCtrl, foundUser.password);

  if (!isMatchPassword) {
    throw new Exception(MESSAGE.USER.LOGIN_FAIL);
  }
  const {
    password,
    isBanned,
    isBlocked,
    createdAt,
    updatedAt,
    __v,
    ...userDTO
  } = foundUser._doc;

  const accessToken = JWT.generateAccessToken(userDTO._id, userDTO.role);
  const refreshToken = JWT.generateRefreshToken(userDTO._id, userDTO.role);
  await userRepository.updateRefreshTokenRepo(userDTO._id, refreshToken);

  return { accessToken, refreshToken, userDTO };
};

const getAllUserService = async () => {
  const listUser = await userRepository.getAllRepo();
  const listUserDTO = listUser.map((item) => {
    const { password, __v, ...userDTO } = item._doc;
    return userDTO;
  });
  return listUserDTO;
};

const getUserByIdService = async (id) => {
  const foundUser = await userRepository.getByIdRepo(id);

  const {
    password,
    isBanned,
    isBlocked,
    createdAt,
    updatedAt,
    __v,
    ...userDTO
  } = foundUser._doc;
  return userDTO;
};

const updateForUserService = async () => {};

const updateForAdminService = async () => {};

const deleteUserService = async () => {};

const setBannedService = async () => {};

const setBlockedService = async () => {};

export default {
  registerService,
  loginService,
  getAllUserService,
  getUserByIdService,
  updateForUserService,
  updateForAdminService,
  deleteUserService,
  setBannedService,
  setBlockedService,
};
