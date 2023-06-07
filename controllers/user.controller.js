import { userRepository } from "../repositories/index.js";
import MESSAGE from "../constants/message.js";

const getAll = async (req, res) => {
  try {
    const listUser = await userRepository.getAllRepo();
    res.status(200).json({
      message: "Get success",
      data: listUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "Get fail",
      data: "",
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await userRepository.getByIdRepo(id);
    res.status(200).json({
      message: "Get User success",
      data: findUser,
    });
  } catch (error) {
    res.status(404).json({
      message: MESSAGE.USER_NOT_FOUND,
      data: "",
    });
  }
};

const register = async (req, res) => {
  const { fullName, phone, email, password } = req.body;
  try {
    const newUser = await userRepository.registerRepo({
      fullName,
      phone,
      email,
      password,
    });
    res.status(201).json({
      message: "Register Success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: MESSAGE.USER_EXITS,
      data: "",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Login Fail",
      data: "",
    });
  }
  try {
    const user = await userRepository.loginRepo({ email, password });
    res.status(200).json({
      message: "Login Success",
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, phone } = req.body;
  try {
    const editUser = await userRepository.updateRepo({ id, fullName, phone });
    res.status(200).json({
      message: "Update User Success",
      data: editUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "Update User Fail",
      data: "",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await userRepository.deleteRepo(id);
    res.status(200).json({
      message: "Delete User Success",
      data: "",
    });
  } catch (error) {
    res.status(404).json({
      message: MESSAGE.USER_NOT_FOUND,
      data: "",
    });
  }
};

export { getAll, getById, register, login, updateUser, deleteUser };
