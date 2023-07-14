import express from "express";
import { addComment, getBlogComment, getBlogs, getUserBlogs } from "../controllers/blogs.js";

const router = express.Router();

//Read

router.get("/", getBlogs);
router.get("/:userId/blogs", getUserBlogs);
router.get("/:blogId/comments", getBlogComment);

// Update

router.patch("/:id/comment", addComment);

export default router;
