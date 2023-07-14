import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsPlusCircle, BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

const BlogCard = ({ data, isEditable, setData }) => {
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
      await fetch(`http://localhost:8080/blog/${data.userId}/comment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
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
        `http://localhost:8080/blog/${data._id}/comments`,
        {
          method: "GET",
        }
      );
      const ans = await res.json();
      setComments(ans[0].comments);
      setLoading(false);
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

  const editComment = async () => {
    setData({
      title: data.title,
      description: data.description,
      currentImage: data.image,
    });
    console.log(data._id);
    await fetch(`http://localhost:8080/blog/${data._id}/delete`, {
      method: "GET",
    });
  };

  return (
    <div className="flex flex-col p-6 gap-4 bg-gray-100 rounded-md">
      <img src={data.image} alt="Image" className="rounded-md" />
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold tracking-wider leading-3 ml-3">
          {data.title}
        </h1>
        <h3 className="text-lg font-medium italic">
          by&nbsp;&#x40;{data?.userName}
        </h3>
      </div>
      <p className="px-3 bg-white/50">{data.description}</p>
      <h2 className="text-lg mt-4 font-semibold tracking-wider leading-3 ml-3 flex items-center">
        Comments&nbsp;&nbsp;
        <BsPlusCircle
          size={28}
          className="cursor-pointer"
          onClick={toggleShowComment}
        />
        {isEditable && (
          <AiFillEdit
            size={28}
            className="cursor-pointer ml-auto "
            onClick={editComment}
          />
        )}
      </h2>

      {showComment && (
        <>
          <div className={` gap-2 bg-white flex mx-4`}>
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
          <div className="bg-white/50 max-h-52 overflow-y-scroll">
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
