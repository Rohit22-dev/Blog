import { Schema, model } from "mongoose";

const CommentSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

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
      url: {
        type: String,
        required: true,
      },
      fileId: {
        type: String,
        required: true,
      },
    },
    description: { type: String, required: true },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  { timeStamp: true }
);

const Blog = model("Blog", BlogSchema);

export default Blog;
