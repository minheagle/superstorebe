import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Product",
  new Schema({
    id: {
      type: mongoose.Types.ObjectId,
    },
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
  })
);
