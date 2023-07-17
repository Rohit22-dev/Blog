"use client";
import { setLogin } from "@/store/slice";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";

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

const CustomMobileLink = ({ link, title }) => {
  return (
    <Link
      className="w-full text-center p-4 text-md hover:bg-teal-500/50"
      href={link}
    >
      {title}
    </Link>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.counter.user);
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    dispatch(setLogin({}));
    toast.success("Logout successful", { autoClose: 2000 });
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full sticky top-0 flex justify-between md:justify-around px-10 md:px-6 lg:px-16 py-2 shadow-md shadow-teal-500 bg-teal-400 ">
      <h1 className="font-bold text-xl inline self-center">Blog</h1>
      <nav className="md:flex w-1/2 gap-10 lg:gap-20 items-center hidden">
        <CustomLink link="/" title="Home" />
        <CustomLink link="/blog" title="Blog" />
        <CustomLink link="/about" title="About" />
      </nav>
      <div className="md:flex gap-6 hidden">
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

      <div className="px-2 p-1 rounded-lg font-semibold flex md:hidden items-center gap-2 shadow-md shadow-teal-600 border-[1px] border-teal-500 ">
        <FaRegUser />
        {user?.name}
      </div>

      <button
        className="flex-col justify-center items-center flex md:hidden z-50"
        onClick={handleClick}
      >
        <span
          className={`bg-black block transition-all ease-out duration-300 h-0.5 w-6 rounded-sm  ${
            isOpen ? "rotate-45 translate-y-1.5" : "-tanslate-y-1"
          } `}
        ></span>
        <span
          className={`bg-black block transition-all ease-out duration-300 h-0.5 w-6 rounded-sm my-1 ${
            isOpen ? "opacity-0" : "opacity-100"
          } `}
        ></span>
        <span
          className={`bg-black block transition-all ease-out duration-300 h-0.5 w-6 rounded-sm  ${
            isOpen ? "-rotate-45 -translate-y-1.5" : "tanslate-y-1"
          } `}
        ></span>
      </button>

      <div
        className={`flex md:hidden flex-col items-center pt-20 h-screen rounded-lg ${
          isOpen
            ? "x w-3/5 sm:w-1/2 px-16 divide-teal-400 divide-y-2"
            : "hidden"
        } backdrop-blur-sm right-0 absolute bg-teal-500/30 top-0 transition-all ease-in-out duration-300`}
      >
        <CustomMobileLink link="/" title="Home" />
        <CustomMobileLink link="/blog" title="Blog" />
        <CustomMobileLink link="/about" title="About" />
        <Link
          href="/"
          onClick={logout}
          className="bg-teal-700 py-2 rounded-b-md  text-white shadow-md shadow-black/50 hover:shadow-none flex items-center w-full mt-auto mb-20 justify-center"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
