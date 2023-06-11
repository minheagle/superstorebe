import { StatusCodes } from "http-status-codes";

import { userService } from "../services/index.js";
import MESSAGE from "../constants/message.js";

const getAll = async (req, res) => {
  try {
    const listUser = await userService.getAllUserService();
    return res.status(StatusCodes.OK).json({
      message: MESSAGE.USER.GET_ALL_USER_SUCCESS,
      data: listUser,
    });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: MESSAGE.USER.GET_ALL_USER_FAIL,
      data: "",
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: MESSAGE.USER.USER_NOT_FOUND,
        data: "",
      });
    }
    const foundUser = await userService.getUserByIdService(id);

    return res.status(StatusCodes.OK).json({
      message: MESSAGE.USER.GET_USER_BY_ID_SUCCESS,
      data: foundUser,
    });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: MESSAGE.USER_NOT_FOUND,
      data: "",
    });
  }
};

const register = async (req, res) => {
  const { fullName, phone, email, password, role, address } = req.body;
  if (!fullName || !phone || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: MESSAGE.USER.MISSING_FIELD,
      data: "",
    });
  }
  debugger;
  try {
    debugger;
    const newUser = await userService.registerService({
      fullName: fullName,
      phone: phone,
      email: email,
      password: password,
      role: role,
      address: address,
    });
    debugger;
    return res.status(StatusCodes.CREATED).json({
      message: MESSAGE.USER.REGISTER_SUCCESS,
      data: newUser,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error,
      data: "",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: MESSAGE.USER.MISSING_FIELD,
      results: "",
    });
  }
  try {
    const user = await userService.loginService(email, password);
    const { userDTO, accessToken, refreshToken } = user;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.LOGIN_SUCCESS,
      results: {
        data: userDTO,
        accessToken,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: MESSAGE.USER.LOGIN_FAIL,
      results: "",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, phone } = req.body;
  if (!fullName || !phone) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: MESSAGE.USER.MISSING_FIELD,
      data: "",
    });
  }
  try {
    const editUser = await userRepository.updateRepo({ id, fullName, phone });
    res.status(StatusCodes.OK).json({
      message: MESSAGE.USER.UPDATE_USER_SUCCESS,
      data: editUser,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: MESSAGE.USER.UPDATE_USER_FAIL,
      data: "",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await userRepository.deleteRepo(id);
    res.status(StatusCodes.OK).json({
      message: MESSAGE.USER.DELETE_USER_SUCCESS,
      data: "",
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: MESSAGE.USER_NOT_FOUND,
      data: "",
    });
  }
};

export { getAll, getById, register, login, updateUser, deleteUser };
