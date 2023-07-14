"use client";
import Home from "@/components/Home";
import Layout from "@/components/Layout";
import Login from "@/components/Login";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "../nexttoast";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const user = useSelector((state) => state.counter.user);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <>
      {user ? (
        <Layout>
          <Home />
        </Layout>
      ) : (
        <div className="w-screen h-screen flex bg-teal-200">
          <ToastContainer />
          <Login />
        </div>
      )}
    </>
  );
};

export default Page;
