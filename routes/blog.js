import express from "express";
import {
  addComment,
  deleteBlog,
  getBlogComment,
  getBlogs,
  getUserBlogs,
  updateBlog,
} from "../controllers/blogs.js";

const router = express.Router();

//Read

router.get("/", getBlogs);
router.get("/:userId/blogs", getUserBlogs);
router.get("/:blogId/comments", getBlogComment);

// Update

router.patch("/:id/comment", addComment);
router.patch("/update", updateBlog);

//Delete

router.delete("/:blogId/delete", deleteBlog);

export default router;
