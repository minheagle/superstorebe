import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Brand",
  new Schema(
    {
      id: {
        type: mongoose.Types.ObjectId,
      },
      categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
      name: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);
