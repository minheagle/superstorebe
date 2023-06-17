import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Comment",
  new Schema(
    {
      id: {
        type: mongoose.Types.ObjectId,
      },
      comment: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);
