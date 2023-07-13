"use client";
import { setLogin } from "@/store/slice";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.counter.user);

  const logout = () => {
    dispatch(setLogin({}));
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
    <div className="w-full sticky flex justify-around px-16 py-2 shadow-md shadow-teal-500 bg-teal-400">
      <h1 className="flex-grow ml-32 font-bold text-xl">Blog Assignment</h1>
      <nav className="flex gap-10 px-20 lg:px-32 items-center">
        <CustomLink link="/" title="Home" />
        <CustomLink link="/blog" title="Blog" />
        <CustomLink link="/about" title="About" />
        <div className="px-2 p-1 rounded-lg font-semibold hover:bg-teal-700 hover:text-white cursor-pointer flex items-center gap-2 shadow-md shadow-teal-600 border-[1px] border-teal-500 hover:border-none">
          <FaRegUser />
          {user?.name}
        </div>
        <Link href="/" onClick={logout} className="btn-primary">
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
