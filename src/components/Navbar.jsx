"use client";
import { setLogin } from "@/store/slice";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.counter.user);

  const logout = () => {
    dispatch(setLogin({}));
    toast.success("Logout successful", { autoClose: 2000 });
  };

  const CustomLink = ({ link, title }) => {
    return (
      <Link href={link} className="cursor-pointer group relative">
        {title}
        <span className="w-0 group-hover:w-full absolute bottom-0 left-0 duration-300 inline-block h-[1px] bg-black/90">
          &nbsp;
        </span>
      </Link>
    );
  };

  return (
    <div className="w-full sticky flex justify-around px-6 lg:px-16 py-2 shadow-md shadow-teal-500 bg-teal-400">
      <nav className="flex gap-4 w-1/2 md:gap-6 px-4 md:px-20 lg:px-32 items-center">
        <h1 className="font-bold text-xl mr-10">Blog Assignment</h1>
        <CustomLink link="/" title="Home" />
        <CustomLink link="/blog" title="Blog" />
        <CustomLink link="/about" title="About" />
      </nav>
      <div className="flex gap-6">
        <div className="px-2 p-1 rounded-lg font-semibold flex items-center gap-2 shadow-md shadow-teal-600 border-[1px] border-teal-500 ">
          <FaRegUser />
          {user?.name}
        </div>
        <Link
          href="/"
          onClick={logout}
          className="btn-primary flex items-center"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
