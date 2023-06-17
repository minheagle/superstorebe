import ResponseObject from "../utils/ResponseObject.js";
import MESSAGE from "../constants/message.js";
import { StatusCodes } from "http-status-codes";
import handleImage from "../helpers/handleImage.js";

const handleImageMiddleware = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.file) {
      const result = await handleImage.singleImage(req.file);
      req.image = result;
      return next();
    }
    if (req.files) {
      const result = await handleImage.multipleImage(req.files);
      req.images = result;
      return next();
    }
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(new ResponseObject("FAIL", error.message, ""));
  }
};

export default handleImageMiddleware;
