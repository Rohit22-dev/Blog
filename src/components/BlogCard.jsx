import React, { useEffect, useState } from "react";
import { BsPlusCircle, BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";

const BlogCard = ({ data }) => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [randomColors, setRandomColors] = useState([]);
  const [comments, setComments] = useState(null);
  const user = useSelector((state) => state.counter.user);

  const handleComment = async () => {
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
      setComment("");
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
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
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

  return (
    <div className="flex flex-col p-6 gap-4 bg-gray-100 rounded-md">
      <img src={data.image} alt="Image" className="rounded-md" />
      <h1 className="text-2xl font-semibold tracking-wider leading-3 ml-3">
        {data.title}
      </h1>
      <p className="px-3 bg-white/50">{data.description}</p>
      <h2 className="text-lg mt-4 font-semibold tracking-wider leading-3 ml-3 flex items-center">
        Comments&nbsp;&nbsp;
        <BsPlusCircle
          size={28}
          className="cursor-pointer"
          onClick={toggleShowComment}
        />
      </h2>

      {showComment && (
        <div className="bg-white/50 max-h-60 overflow-y-scroll">
          <div className={` gap-2 bg-white flex `}>
            <input
              type="text"
              value={comment}
              placeholder="Comment here.."
              onChange={(e) => setComment(e.target.value)}
              className="p-3 flex-1 shadow-inner shadow-black/25 rounded-md outline-none"
            />
            <button
              className="flex items-center btn-primary"
              onClick={handleComment}
            >
              Send&nbsp;
              <BsSend />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-2">
            {comments?.map((comment, index) => (
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
        </div>
      )}
    </div>
  );
};

export default BlogCard;
