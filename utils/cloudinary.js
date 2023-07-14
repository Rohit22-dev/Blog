import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "octivion",
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
