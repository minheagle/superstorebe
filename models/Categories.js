import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Category",
  new Schema(
    {
      id: {
        type: mongoose.Types.ObjectId,
      },
      name: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
