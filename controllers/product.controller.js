import productService from "../services/index.js";
import MESSAGE from "../constants/message.js";
import ResponseObject from "../utils/ResponseObject.js";
import Exception from "../exceptions/Exception.js";
import { StatusCodes } from "http-status-codes";

const create = async (req, res) => {
  const { categoryId, brandId, seriesId, name, basePrice, description } =
    req.boy;

  try {
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new ResponseObject("FAIL", MESSAGE.PRODUCT.CREATE_PRODUCT_FAIL, "")
      );
  }

  // try {
  //   return res.status(200).json(new ResponseObject());
  // } catch (error) {
  //   return res.status(400).json(new ResponseObject("FAIL", error.message, ""));
  // }
  // console.log(req.headers?.cookie?.split("=")[1]);
  // const { productName, productPrice } = req.body;
  // try {
  //   const newProduct = await productRepository.createRepo(
  //     productName,
  //     productPrice
  //   );
  //   res.status(201).json({
  //     message: MESSAGE.CREATE_PRODUCT_SUCCESS,
  //     data: newProduct,
  //   });
  // } catch (error) {
  //   res.status(400).json({
  //     message: MESSAGE.CREATE_PRODUCT_FAIL,
  //     data: "",
  //   });
  // }
};

export default { create };
