import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import BlogCard from "./BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8080/blog");
      const data = await res.json();
      // console.log(data);
      setBlogs(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="grid place-items-center flex-grow">
          <FadeLoader loading={isLoading} color="#0f766e" />
        </div>
      ) : (
        <div className="flex flex-col w-full lg:w-2/3 p-20 gap-10">
          {blogs?.reverse().map((blog, index) => (
            <BlogCard key={index} data={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
