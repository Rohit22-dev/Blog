// SDK initialization

import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: "private_QyJVeZ7TNB91crL7M4QGM0oebq4=",
  urlEndpoint: "https://ik.imagekit.io/octivion/Blogs",
});

export default imagekit;
