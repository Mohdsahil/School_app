import React from "react";
import Navbar from "./Navbar";

const Layout = ({
  title = "Layour Title",
  description = "description ",
  children,
  history,
}) => {
  return (
    <div className="">
      <header>
        <Navbar />
      </header>
      <div className=" text-center">
        <h1>{title}</h1>
        <h3>{description} </h3>
      </div>
      <div>{children}</div>
      <footer className="bg2 text-white">
        <div className="text-center">
          <small>2020 all rights are reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
