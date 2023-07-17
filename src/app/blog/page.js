"use client";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import imagekit from "@/utils/imagekit";
import { toast } from "react-toastify";
import BlogCard from "@/components/BlogCard";
import { FadeLoader } from "react-spinners";

const Blog = () => {
  const user = useSelector((state) => state.counter.user);
  const [words, setWords] = useState(0);
  const [image, setImage] = useState(null);

  const initialData = {
    title: "",
    description: "",
    currentImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
      fileId: "",
    },
  };
  const [data, setData] = useState(initialData);
  const [isUpload, setIsUpload] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  const handleImageChange = async (e) => {
    if (data.currentImage.fileId !== "") {
      await imagekit.deleteFile(data.currentImage.fileId);
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    setImage(file);
    reader.readAsDataURL(file);
    setData((prevData) => {
      return {
        ...prevData,
        currentImage: {
          url: URL.createObjectURL(file),
          fileId: "",
        },
      };
    });
  };

  const handleDescription = (e) => {
    setData({ ...data, description: e.target.value });
    const words = e.target.value.replace(/\s/g, "");
    setWords(words.length);
  };

  const handleSubmit = async () => {
    setIsUpload(true);

    try {
      let postdata = {
        userId: user?._id,
        image: data.currentImage,
        title: data.title,
        description: data.description,
      };
      // Check if the image file is selected for upload
      if (image) {
        const res = await imagekit.upload({
          file: image,
          fileName: data.title,
          folder: "Blogs",
        });
        postdata = {
          ...postdata,
          image: { url: res.url, fileId: res.fileId },
        };
      }

      if (editBlogId) {
        await fetch("https://blog-zlon.onrender.com/blog/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...postdata, _id: editBlogId }),
        });
      } else {
        await fetch("https://blog-zlon.onrender.com/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postdata),
        });
      }

      toast.success(`${editBlogId ? "Updated" : "Posted"} successfully`, {
        autoClose: 2000,
      });
      setIsUpload(false);
      setData(initialData);
      setEditBlogId(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isUpload) {
      fetchBlogs();
    }
  }, [isUpload]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://blog-zlon.onrender.com/blog/${user._id}/blogs`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setUserBlogs(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteUserBlog = (blogId) => {
    const updatedUserBlogs = userBlogs.filter((blog) => blog._id !== blogId);
    setUserBlogs(updatedUserBlogs);
  };

  return (
    <Layout>
      <div className="flex flex-col px-4 md:px-20 w-full lg:flex-row gap-6 ">
        <div className=" my-16 rounded-lg flex-grow shadow-lg p-6 shadow-slate-300 border flex flex-col gap-6 bg-gray-100 ">
          <h1 className="text-3xl text-center font-bold tracking-widest">
            Blog
          </h1>
          <img
            src={data.currentImage.url}
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
          <div className="flex md:flex-row flex-col-reverse  items-center gap-2 relative flex-grow">
            <button
              className="btn-primary md:h-full w-full md:w-32 lg:w-44 flex justify-center items-center cursor-pointer "
              onClick={handleSubmit}
            >
              {isUpload ? (
                editBlogId ? (
                  "Updating"
                ) : (
                  "Posting"
                )
              ) : (
                <AiOutlinePlusCircle className="text-4xl md:text-6xl" />
              )}
            </button>
            <textarea
              onChange={handleDescription}
              className="border rounded-md flex-1 h-full w-full shadow-inner shadow-gray-300 outline-none p-1 pl-2 caret-teal-700"
              placeholder="Blog description"
              maxLength={1000}
              value={data.description}
            />
            <span className="text-end w-full text-sm absolute right-0 -bottom-5">{`${words}/1000`}</span>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:h-[88vh] lg:overflow-y-scroll lg:w-1/2 lg:mb-0 mb-20 pr-2">
          <h1 className="text-center -mb-6 mt-2 text-4xl font-medium underline underline-offset-4 ">
            Your Blogs
          </h1>
          {isLoading ? (
            <div className="grid place-items-center flex-grow">
              <FadeLoader loading={isLoading} color="#0f766e" />
            </div>
          ) : userBlogs.length === 0 ? (
            <p className="text-center mt-14 text-lg text-red-600 font-mono">
              No post yet
            </p>
          ) : (
            userBlogs
              ?.reverse()
              .map((userBlog, index) => (
                <BlogCard
                  key={index}
                  data={userBlog}
                  isEditable={true}
                  setData={setData}
                  onDelete={handleDeleteUserBlog}
                  setEditBlogId={setEditBlogId}
                  fetchBlogs={fetchBlogs}
                />
              ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
