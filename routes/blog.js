import express from "express";
import { getBlogs, getUserBlogs } from "../controllers/blogs.js";

const router = express.Router();

//Read

router.get("/", getBlogs);
router.get("/:userId/blogs", getUserBlogs);

//Update

// router.patch("/:id/like", verifyToken, likePost);

export default router;
