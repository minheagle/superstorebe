import { imageRepository } from "../repositories/index.js";
import handleImageBase64 from "../helpers/imageBase64.js";
import Exception from "../exceptions/Exception.js";
import MESSAGE from "../constants/message.js";

const insertOneService = async ({ imageBase64, productId }) => {
  try {
    handleImageBase64(imageBase64);
    const result = await imageRepository.insertOneRepo({
      productId,
      imageBase64,
    });
  } catch (error) {
    throw new Exception("Loi o service");
  }
};

export default { insertOneService };
