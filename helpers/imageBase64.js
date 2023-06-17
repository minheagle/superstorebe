import Exception from "../exceptions/Exception.js";
import MESSAGE from "../constants/message.js";
const handleImageBase64 = (imageBase64) => {
  const imageString = imageBase64.split(";base64,")[1];
  const preFix = imageBase64.split(";base64,")[0];
  const imageType = preFix.split("/")[1];
  if (imageType === "png" || imageType === "jpg" || imageType === "jpeg") {
    const imageSize = Buffer.from(imageString).length;
    if (imageSize > 5 * 1024 * 1024) {
      throw new Exception(MESSAGE.IMAGE.SIZE_MORE_THAN_5MB);
    }
    return true;
  } else {
    throw new Exception(MESSAGE.IMAGE.TYPE_NOT_SUPPORT);
  }
};

export default handleImageBase64;
