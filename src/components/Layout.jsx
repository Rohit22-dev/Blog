import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "../nexttoast";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col bg-img items-center overflow-y-scroll">
      <Navbar />
      {children}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Layout;
