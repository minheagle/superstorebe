import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Image",
  new Schema(
    {
      id: {
        type: mongoose.Types.ObjectId,
      },
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      imageBase64: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);
