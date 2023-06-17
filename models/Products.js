import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Product",
  new Schema(
    {
      id: {
        type: mongoose.Types.ObjectId,
      },
      categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
      brandId: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
      },
      seriesId: {
        type: mongoose.Types.ObjectId,
        ref: "Series",
      },
      name: {
        type: String,
        required: true,
        unique: true,
      },
      slug: {
        type: String,
        required: true,
        lowercase: true,
      },
      basePrice: {
        type: Number,
        required: true,
      },
      isNewProduct: {
        type: Boolean,
        default: true,
      },
      options: [
        {
          typeOption: {
            type: String,
          },
          nameOption: {
            type: String,
          },
          percentPrice: {
            type: Number,
          },
        },
      ],
      description: {
        type: String,
        required: true,
      },
      rating: [
        {
          star: {
            type: Number,
          },
          postBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
          },
        },
      ],
      totalRating: {
        type: Number,
        default: 0,
      },
      listImage: [
        {
          id: { type: String },
          url: { type: String },
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
