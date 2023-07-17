import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../public/images/profile.png";
import Image from "next/image";
import { MdCheck, MdEdit } from "react-icons/md";
import imagekit from "@/utils/imagekit";
import { setLogin } from "@/store/slice";

const Profile = () => {
  const user = useSelector((state) => state.counter.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [about, setAbout] = useState("Lorem ipsum");
  const [currentImage, setCurrentImage] = useState(null);

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const toggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleProfileChange = async (e) => {
    try {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log(URL.createObjectURL(file));
      setCurrentImage(URL.createObjectURL(file));

      console.log("object", user);

      // if (user?.image) {
      //   await imagekit.deleteFile(user?.image?.fileId);
      // }

      console.log("first");
      const image = await imagekit.upload({
        file: file,
        fileName: user.name,
        folder: "Blogs_profile",
      });
      console.log(user);
      const res = await fetch(
        `https://blog-zlon.onrender.com/auth/${user._id}/image`,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            image: { url: image.url, fileId: image.fileId },
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      setCurrentImage(null);
      dispatch(setLogin(data));
    } catch (error) {
      console.log(error);
    }
  };

  const aboutChange = async () => {
    if (edit) {
      try {
        const res = await fetch(
          `https://blog-zlon.onrender.com/auth/${user._id}/about`,
          {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              about,
            }),
          }
        );
        const data = await res.json();
        dispatch(setLogin(data));
      } catch (error) {
        console.log(error, about);
      }
    }
    toggleEdit();
  };

  useEffect(() => {
    if (edit && about !== user.about) {
      aboutChange();
    }
  }, []);

  return (
    <div className="hidden lg:block w-1/5 h-80 bg-gray-100 p-4 rounded-md sticky top-[130px]">
      <div className="flex flex-col rounded-md border border-teal-500 h-full p-3 items-center ">
        <label htmlFor="profile">
          <Image
            src={
              currentImage
                ? currentImage
                : user?.image
                ? user?.image?.url
                : profile
            }
            width={100}
            height={100}
            className="rounded-full cursor-pointer "
            alt="profile"
          />
          <input
            type="file"
            id="profile"
            hidden
            onChange={handleProfileChange}
          />
        </label>
        <p className="font-semibold text-lg mt-2">{user.name}</p>
        <p className="font-medium text-sm">{user.email}</p>
        <p className="text-start text-sm w-full mt-2 px-2 flex items-center justify-between">
          About:
          {edit ? (
            <MdCheck
              className="text-end cursor-pointer hover:bg-gray-200 rounded-full p-1 bg-teal-100"
              size={24}
              onClick={aboutChange}
            />
          ) : (
            <MdEdit
              className="text-end cursor-pointer hover:bg-gray-200 rounded-full p-1"
              size={24}
              onClick={aboutChange}
            />
          )}
        </p>
        {edit ? (
          <textarea
            className="user-about outline-none text-sm"
            value={about}
            onChange={handleAboutChange}
            maxLength={50}
          />
        ) : (
          <div className="user-about text-sm">{about}</div>
        )}
      </div>
    </div>
  );
};

export default memo(Profile);
