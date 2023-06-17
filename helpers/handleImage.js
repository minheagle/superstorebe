import Exception from "../exceptions/Exception.js";
import MESSAGE from "../constants/message.js";
import { v2 as cloudinary } from "cloudinary";

const singleImage = async (image) => {
  const { filename } = image;
  const result = await cloudinary.search
    .expression(`filename: ${filename}`)
    .execute();
  const resources = result.resources;
  if (
    image.mimetype !== "image/jpg" &&
    image.mimetype !== "image/png" &&
    image.mimetype !== "image/jpeg"
  ) {
    await cloudinary.uploader.destroy(resources[0].public_id, (err, res) => {
      if (err) throw new Exception(MESSAGE.IMAGE.ERROR);
    });
    throw new Exception(MESSAGE.IMAGE.TYPE_NOT_SUPPORT);
  }
  if (image.size > 5 * 1024 * 1024) {
    await cloudinary.uploader.destroy(resources[0].public_id, (err, res) => {
      if (err) throw new Exception(MESSAGE.IMAGE.ERROR);
    });
    throw new Exception(MESSAGE.IMAGE.SIZE_MORE_THAN_5MB);
  }
  return resources[0];
};

const multipleImage = async (images) => {
  let isCheck = true;
  let isErrorSize = false;
  let isErrorType = false;
  images.forEach((image) => {
    if (
      image.mimetype !== "image/jpg" &&
      image.mimetype !== "image/png" &&
      image.mimetype !== "image/jpeg"
    ) {
      isCheck = false;
      isErrorType = true;
    }
    if (image.size > 5 * 1024 * 1024) {
      isCheck = false;
      isErrorSize = true;
    }
  });
  const filenames = images.map((item) => item.filename);

  if (isCheck) {
    const result = await getDetailImagesFromFilenames(filenames);
    return result;
  } else {
    await deleteImagesFromFilenames(filenames);
    if (isErrorType) throw new Exception(MESSAGE.IMAGE.TYPE_NOT_SUPPORT);
    if (isErrorSize) throw new Exception(MESSAGE.IMAGE.SIZE_MORE_THAN_5MB);
  }
};

const getDetailImagesFromFilenames = async (filenames) => {
  try {
    const response = await cloudinary.api.resources_by_ids(filenames, {
      max_results: filenames.length,
    });
    return response.resources;
  } catch (error) {
    throw new Exception(error);
  }
};

const deleteImagesFromFilenames = async (filenames) => {
  try {
    const response = await cloudinary.api.delete_resources(filenames);
    return response.deleted;
    console.log(response);
  } catch (error) {
    throw new Exception(error);
  }
};

export default { singleImage, multipleImage };
