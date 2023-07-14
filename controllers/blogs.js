import User from "../models/User.js";
import Blog from "../models/Blog.js";

//create blog

export const createBlog = async (req, res) => {
  try {
    const { userId, title, image, description } = req.body;

    const user = await User.findOne({ _id: userId });

    const newBlog = await new Blog({
      userId,
      userName: user.name,
      title,
      image,
      description,
      comments: [],
    });
    await newBlog.save();

    res.status(201).json({ msg: "Blog saved successfully" });
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

//Read

export const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find();
    // console.log(blog);
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    // console.log("object");
    const { userId } = req.params;
    // console.log(userId);
    const blog = await Blog.find({ userId: userId });
    // console.log(blog);
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get comment
export const getBlogComment = async (req, res) => {
  try {
    console.log("object");
    const { blogId } = req.params;
    console.log(blogId);
    const blog = await Blog.find({ _id: blogId });
    console.log("blog", blog);
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  const { _id, userName, comment } = req.body;
  console.log(req.body);

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      _id,
      {
        $push: {
          comments: { userName: userName, comment: comment },
        },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    updatedBlog?.comments?.forEach((comment) => {
      comment._id = undefined;
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
