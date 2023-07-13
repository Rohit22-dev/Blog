import mongoose, { Schema } from "mongoose";

const BlogSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: { type: String, required: true },
    },
    description: { type: String, required: true },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timeStamp: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
