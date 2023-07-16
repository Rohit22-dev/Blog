import express from "express";
import { login, updateProfileAbout, updateProfileImage } from "../controllers/authUser.js";

const router = express.Router();

router.post("/login", login);

//update

router.patch("/:userId/image",updateProfileImage)
router.patch("/:userId/about",updateProfileAbout)

export default router;
