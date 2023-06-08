import { Product } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import MESSAGE from "../constants/message.js";

const getAllRepo = async () => {
  const listProduct = await Product.find();
  return listProduct;
};

const getByIdRepo = async (id) => {
  const findProduct = await Product.findById(id).exec();
  if (findProduct === null) {
    throw new Exception(MESSAGE.PRODUCT_NOT_FOUND);
  }
  return findProduct;
};

const createRepo = async (productName, productPrice) => {
  const newProduct = Product.create({ productName, productPrice });
  if (newProduct === null) {
    throw new Exception(MESSAGE.CREATE_PRODUCT_FAIL);
  }
  return newProduct;
};

export default { getAllRepo, getByIdRepo, createRepo };
