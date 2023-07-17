import imagekit from "@/utils/imagekit";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsSend,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const BlogCard = ({
  data,
  isEditable,
  setData,
  onDelete,
  setEditBlogId,
  fetchBlogs,
}) => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [randomColors, setRandomColors] = useState([]);
  const [comments, setComments] = useState(null);
  const user = useSelector((state) => state.counter.user);
  const [isLoading, setLoading] = useState(false);

  const handleComment = async () => {
    setLoading(true);
    setComment("");

    const body = {
      _id: data._id,
      userName: user.name,
      comment: comment,
    };
    try {
      await fetch(
        `https://blog-zlon.onrender.com/blog/${data.userId}/comment`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      fetchComments();
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleShowComment = () => {
    setShowComment((prevShowComment) => !prevShowComment);
  };

  useEffect(() => {
    if (showComment) {
      const colors = data?.comments.map(() => getRandomColor());
      setRandomColors(colors);
      fetchComments();
    }
  }, [showComment]);

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `https://blog-zlon.onrender.com/blog/${data._id}/comments`,
        {
          method: "GET",
        }
      );
      const ans = await res.json();
      setComments(ans[0].comments);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const editBlog = async () => {
    setData({
      title: data.title,
      description: data.description,
      currentImage: data.image,
    });
    setEditBlogId(data._id);

    onDelete(data._id);
  };

  const deleteBlog = async () => {
    await fetch(`https://blog-zlon.onrender.com/blog/${data._id}/delete`, {
      method: "DELETE",
    });
    imagekit.deleteFile(data.image.fileId);
    fetchBlogs();
    toast.success("Deleted successfully");
  };

  return (
    <div className="flex flex-col p-6 gap-4 bg-gray-100 rounded-md">
      <img src={data.image.url} alt="Image" className="rounded-md" />
      <div className="flex md:flex-row flex-col justify-between">
        <h1 className="text-base md:text-2xl font-semibold tracking-wider leading-5 ml-3 w-3/5">
          {data.title}
        </h1>
        <h3 className="text-base md:text-lg font-medium italic ml-3 md:ml-0">
          by&nbsp;&#x40;{data?.userName}
        </h3>
      </div>
      <p className="px-3 text-sm md:text-base bg-white/50">
        {data.description}
      </p>
      <h2 className="text-sm md:text-lg mt-4 font-semibold tracking-wider leading-3 ml-3 flex items-center">
        Comments&nbsp;
        {showComment ? (
          <BsChevronCompactUp
            size={28}
            className="cursor-pointer hover:bg-black/10 rounded-full p-1"
            onClick={toggleShowComment}
          />
        ) : (
          <BsChevronCompactDown
            size={28}
            className="cursor-pointer hover:bg-black/10 rounded-full p-1"
            onClick={toggleShowComment}
          />
        )}
        {isEditable && (
          <div className="ml-auto flex gap-2">
            <AiFillEdit
              size={28}
              className="cursor-pointer "
              onClick={editBlog}
              color="teal"
            />
            <RiDeleteBin6Line
              size={28}
              className="cursor-pointer  "
              onClick={deleteBlog}
              color="#cc0000"
            />
          </div>
        )}
      </h2>

      {showComment && (
        <>
          <div className={` gap-2 bg-white flex flex-col md:flex-row mx-4`}>
            <input
              type="text"
              value={comment}
              placeholder="Comment here.."
              onChange={(e) => setComment(e.target.value)}
              className="p-3 flex-1 shadow-inner shadow-black/25 rounded-md outline-none"
            />
            <button
              className="flex items-center btn-primary justify-center"
              onClick={handleComment}
            >
              Send&nbsp;
              <BsSend />
            </button>
          </div>
          <div className="bg-white/50 max-h-52 overflow-y-scroll">
            <div className="p-4 flex flex-col gap-2">
              {comments?.reverse().map((comment, index) => (
                <div
                  key={index}
                  className="bg-white border border-black/20 rounded-md text-sm p-4"
                >
                  &#x40;_
                  <span
                    className="items-center"
                    style={{ color: randomColors[index] }}
                  >
                    {comment.userName}
                  </span>
                  <br />
                  {comment.comment}
                </div>
              ))}
            </div>

            {isLoading && (
              <div className="text-center w-full">
                <PulseLoader size={10} loading={isLoading} color="#0f766e" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogCard;
