"use client";
import Home from "@/components/Home";
import Layout from "@/components/Layout";
import Login from "@/components/Login";
import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "../nexttoast";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const Page = () => {
  const user = useSelector((state) => state.counter.user);

  return (
    <>
      {user ? (
        <Layout>
          <Home />
        </Layout>
      ) : (
        <div className="w-screen h-screen flex relative">
          <ToastContainer />
          <Login />
          <Image
            src="https://ik.imagekit.io/octivion/Blogs/bg?updatedAt=1690010374396"
            alt="Background"
            priority
            fill
            className="absolute -z-10"
            quality={100}
          />
        </div>
      )}
    </>
  );
};

export default Page;
