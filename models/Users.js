import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "User",
  new Schema(
    {
      id: { type: mongoose.Types.ObjectId },
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: "user",
      },
      address: {
        type: String,
        default: "",
      },
      isBanned: {
        type: Boolean,
        default: false,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      refreshToken: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);
