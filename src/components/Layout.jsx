import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col bg-img items-center ">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
