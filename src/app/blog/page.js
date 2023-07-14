"use client";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import imagekit from "@/utils/imagekit";
import { toast } from "react-toastify";
import BlogCard from "@/components/BlogCard";

const Blog = () => {
  const user = useSelector((state) => state.counter.user);
  const [words, setWords] = useState(0);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"
  );

  const initialData = { title: "", description: "" };
  const [data, setData] = useState(initialData);
  const [isUpload, setIsUpload] = useState(false);
  const [userBlogs, setUserBlogs] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setImage(file);
    reader.readAsDataURL(file);
    setCurrentImage(URL.createObjectURL(file));
  };

  const handleDescription = (e) => {
    setData({ ...data, description: e.target.value });
    const words = e.target.value.trim().split(/\s+/);
    setWords(words.length);
  };

  const handleSubmit = async () => {
    setIsUpload(true);
    try {
      const res = await imagekit.upload({
        file: image,
        fileName: image.name,
        folder: "Blogs",
      });
      console.log(res);

      const postdata = { userId: user?._id, image: res.url, ...data };
      console.log(postdata);
      await fetch("https://blog-zlon.onrender.com/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postdata),
      });
      toast.success("Post successfully", { autoClose: 2000 });
      setIsUpload(false);
      setData(initialData);
      setCurrentImage(
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"
      );
    } catch (error) {
      console.log(error);
    }

    console.log("object");

    // console.log(res.url);
  };

  useEffect(() => {
    fetchBlogs();
  }, [data]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        `https://blog-zlon.onrender.com/blog/${user._id}/blogs`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setUserBlogs(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col px-20 w-full lg:flex-row gap-6 ">
        <div className=" my-16 rounded-lg flex-grow shadow-lg p-6 shadow-slate-300 border flex flex-col gap-6 bg-gray-100 ">
          <h1 className="text-3xl text-center font-bold tracking-widest">
            Blog
          </h1>
          <img
            src={currentImage}
            alt="zoro"
            className="rounded-lg h-96 object-fill"
          />
          <div className="flex items-center gap-2">
            <label
              htmlFor="fileInput"
              className="btn-primary h-full w-32 lg:w-44 flex justify-center items-center cursor-pointer"
            >
              <BiImageAdd size={32} color="white" />
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                id="fileInput"
              />
            </label>
            <input
              type="text"
              className="border rounded-md h-full flex-grow shadow-inner shadow-gray-300 outline-none p-1 pl-2 caret-teal-700"
              placeholder="Blog Title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2 relative flex-grow">
            <button
              className="btn-primary h-full w-32 lg:w-44 flex justify-center items-center cursor-pointer"
              onClick={handleSubmit}
            >
              {isUpload ? "Posting..." : <AiOutlinePlusCircle size={60} />}
            </button>
            <textarea
              onChange={handleDescription}
              className="border rounded-md flex-1 h-full shadow-inner shadow-gray-300 outline-none p-1 pl-2 caret-teal-700"
              placeholder="Blog description"
              maxLength={500}
              value={data.description}
            />
            <span className="text-end w-full text-sm absolute right-0 -bottom-5">{`${words}/500`}</span>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:h-[88vh] lg:overflow-y-scroll lg:w-1/2 lg:mb-0 mb-20 pr-2">
          <h1 className="text-center -mb-6 mt-2 text-4xl font-medium underline underline-offset-4 ">
            Your Blogs
          </h1>
          {userBlogs?.reverse().map((userBlog, index) => (
            <BlogCard key={index} data={userBlog} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
