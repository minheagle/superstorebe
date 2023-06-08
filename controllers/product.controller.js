import { productRepository } from "../repositories/index.js";
import MESSAGE from "../constants/message.js";

const create = async (req, res) => {
  const { productName, productPrice } = req.body;
  try {
    const newProduct = await productRepository.createRepo(
      productName,
      productPrice
    );
    res.status(201).json({
      message: MESSAGE.CREATE_PRODUCT_SUCCESS,
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: MESSAGE.CREATE_PRODUCT_FAIL,
      data: "",
    });
  }
};

export { create };
