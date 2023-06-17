import { Image } from "../models/index.js";
import Exception from "../exceptions/Exception.js";

const insertOneRepo = async ({ productId, imageBase64 }) => {
  try {
    const newImage = await Image.create({ productId, imageBase64 });
    return newImage;
  } catch (error) {
    throw new Exception(error);
  }
};

export default { insertOneRepo };
