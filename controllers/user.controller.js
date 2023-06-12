import { StatusCodes } from "http-status-codes";

import { userService } from "../services/index.js";
import MESSAGE from "../constants/message.js";

const getAll = async (req, res) => {
  try {
    const listUser = await userService.getAllUserService();
    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.GET_ALL_USER_SUCCESS,
      results: {
        data: listUser,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: "FAIl",
      message: error.message,
      results: "",
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: "FAIL",
      message: MESSAGE.USER.USER_NOT_FOUND,
      results: "",
    });
  }
  try {
    const foundUser = await userService.getUserByIdService(id);

    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.GET_USER_BY_ID_SUCCESS,
      results: {
        data: foundUser,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: "FAIL",
      message: error.message,
      results: "",
    });
  }
};

const getByIdForAdmin = async (req, res) => {
  const { id } = req.params;
  if (id === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: MESSAGE.COMMON.MISSING_PARAMETER,
      results: "",
    });
  }
  try {
    const result = await userService.getUserByIdForAdminService(id);
    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.GET_USER_BY_ID_SUCCESS,
      results: {
        data: result,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: "FAIL",
      message: error.message,
      results: "",
    });
  }
};

const register = async (req, res) => {
  const { fullName, phone, email, password, role, address } = req.body;
  if (!fullName || !phone || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: MESSAGE.USER.MISSING_FIELD,
      results: "",
    });
  }
  try {
    const newUser = await userService.registerService({
      fullName,
      phone,
      email,
      passwordCtrl: password,
      role,
      address,
    });
    return res.status(StatusCodes.CREATED).json({
      status: "OK",
      message: MESSAGE.USER.REGISTER_SUCCESS,
      results: {
        data: newUser,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: error.message,
      results: "",
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
      message: error.message,
      results: "",
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, phone, email, address } = req.body;
  if (
    fullName === null ||
    phone === null ||
    email === null ||
    address === null
  ) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: MESSAGE.USER.MISSING_FIELD,
      results: "",
    });
  }
  try {
    const editUser = await userService.updateForUserService({
      id,
      fullName,
      email,
      phone,
      address,
    });
    res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.UPDATE_USER_SUCCESS,
      results: {
        data: editUser,
      },
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "FAIL",
      message: error.message,
      results: "",
    });
  }
};

const changeBanned = async (req, res) => {
  const { id } = req.params;
  const { stateBanned } = req.body;
  if (id === null || stateBanned === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: MESSAGE.COMMON.MISSING_PARAMETER,
      results: "",
    });
  }
  try {
    const result = await userService.setBannedService(id, stateBanned);
    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.CHANGE_SUCCESS,
      results: {
        data: result,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: error.message,
      results: "",
    });
  }
};

const changeBlocked = async (req, res) => {
  const { id } = req.params;
  const { stateBlocked } = req.body;
  if (id === null || stateBlocked === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: MESSAGE.COMMON.MISSING_PARAMETER,
      results: "",
    });
  }
  try {
    const result = await userService.setBlockedService(id, stateBlocked);
    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.CHANGE_SUCCESS,
      results: {
        data: result,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: error.message,
      results: "",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id === null) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: MESSAGE.COMMON.MISSING_PARAMETER,
      results: "",
    });
  }
  try {
    const result = await userService.deleteUserService(id);
    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.DELETE_USER_SUCCESS,
      results: {
        data: result,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: error.message,
      results: "",
    });
  }
};

const unDeleteUser = async (req, res) => {
  const { id } = req.params;
  if (id === null) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: "FAIl",
      message: MESSAGE.USER.USER_NOT_FOUND,
      results: "",
    });
  }
  try {
    const result = await userService.unDeleteUserService(id);
    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: MESSAGE.USER.CHANGE_SUCCESS,
      results: {
        data: result,
      },
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "FAIL",
      message: error.message,
      results: "",
    });
  }
};

export default {
  getAll,
  getById,
  getByIdForAdmin,
  register,
  login,
  updateUser,
  changeBanned,
  changeBlocked,
  deleteUser,
  unDeleteUser,
};
