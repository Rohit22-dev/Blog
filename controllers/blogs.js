import User from "../models/User.js";
import Blog from "../models/Blog.js";
import cloudinary from "../utils/cloudinary.js";

//create blog

export const createBlog = async (req, res) => {
  try {
    const { userId, title, image, description } = req.body;
    console.log(req.body);
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "blogs",
    });
    console.log(result);
    const user = await User.findOne({ _id: userId });
    console.log(user);
    const newBlog = await new Blog({
      userId,
      userName: user.name,
      title,
      image: { public_id: result.public_id, url: result.secure_url },
      description,
      comments: [],
    });
    const savedBlog = await newBlog.save();
    console.log(savedBlog);
    const blog = await Blog.find();
    res.status(201).json(blog);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//Read

export const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const blog = await Blog.find({ userId });
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Update

// export const likePost = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { userId } = req.body;
//       const blog = await Blog.find(id);

//       if (isLiked) {
//         blog.like.delete(userId);
//       } else {
//         blog.likes.set(userId, true);
//       }

//       const updatedPost = await Blog.findByIdAndUpdate(
//         id,
//         { likes: blog.likes },
//         { new: true }
//       );
//       res.status(200).json(updatedPost);
//     } catch (err) {
//       res.status(404).json({ message: err.message });
//     }
//   };
