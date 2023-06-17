import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "User",
  new Schema(
    {
      id: { type: mongoose.Types.ObjectId },
      fullName: {
        type: String,
        trim: true,
        required: true,
      },
      phone: {
        type: String,
        trim: true,
        required: true,
      },
      email: {
        type: String,
        trim: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: {
          values: ["admin", "manager", "employee", "user"],
          message: "{VALUE} not supported",
        },
        default: "user",
      },
      address: {
        type: String,
        trim: true,
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
