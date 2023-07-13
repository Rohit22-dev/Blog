"use client";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import zoro from "../../../public/images/zoro.png";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const Blog = () => {
  const user = useSelector((state) => state.counter.user);
  const [words, setWords] = useState(0);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"
  );

  const initialData = { title: "", description: "" };
  const [data, setData] = useState(initialData);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    setCurrentImage(URL.createObjectURL(file));

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleDescription = (e) => {
    setData({ ...data, description: e.target.value });
    const words = e.target.value.trim().split(/\s+/);
    setWords(words.length);
  };

  const handleSubmit = async () => {
    const postdata = { userId: user?._id, image, ...data };
    console.log(postdata);
    await fetch("http://localhost:8080/Blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postdata),
    });
  };

  return (
    <Layout>
      <div className="mx-20 lg:mx-0 lg:w-2/3 my-16 rounded-lg flex-grow shadow-lg p-6 shadow-slate-300 border flex flex-col gap-6 bg-gray-100 ">
        <h1 className="text-3xl text-center font-bold tracking-widest">Blog</h1>
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
            <AiOutlinePlusCircle size={60} />
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
    </Layout>
  );
};

export default Blog;
