import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import BlogCard from "./BlogCard";
import Profile from "./Profile";
import AdvertCard from "./AdvertCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://blog-zlon.onrender.com/blog");
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
        <div className="flex flex-col-reverse lg:flex-row justify-around pt-20 gap-8 px-10">
          <Profile />
          <div className="flex flex-col w-full lg:w-1/2  gap-10 pb-10">
            {blogs?.reverse().map((blog, index) => (
              <BlogCard key={index} data={blog} />
            ))}
          </div>
          <AdvertCard/>
        </div>
      )}
    </>
  );
};

export default Home;
