import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Series",
  new Schema(
    {
      id: {
        type: mongoose.Types.ObjectId,
      },
      brandId: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
      },
      name: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);
