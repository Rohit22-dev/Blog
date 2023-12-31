import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "../nexttoast";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center overflow-y-scroll bg-img">
      <Navbar />
      {children}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Layout;
