"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/slice";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { PropagateLoader } from "react-spinners";

const Login = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const [type, setType] = useState("Login");
  const [error, setError] = useState({ isError: false, msg: "" });
  const isLogin = type === "Login";
  const isRegister = type === "Register";
  const dispatch = useDispatch();
  const [showPsw, setShowPsw] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggleType = () => {
    setType(type === "Login" ? "Register" : "Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      try {
        console.log(user);
        await fetch("https://blog-zlon.onrender.com/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        setType("Login");
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    }

    if (isLogin) {
      try {
        setLoading(true);
        const { email, password } = user;
        const res = await fetch("https://blog-zlon.onrender.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        // console.log({ user: data?.user });
        if (data.error) {
          setError({ isError: true, msg: data?.message });
          toast.error(data?.message, { autoClose: 3000 });
        } else {
          toast.success("Login successful", { autoClose: 2000 });
          dispatch(setLogin({ user: data?.user }));
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-img">
      <form
        onSubmit={handleSubmit}
        className={
          "flex flex-col gap-6 p-5 bg-teal-400 rounded-lg shadow-lg shadow-black/25 lg:w-1/3"
        }
      >
        <h1 className="text-center text-xl lg:text-4xl font-semibold text-teal-900">
          {isLogin ? "Welcome back!" : "Create new account"}
        </h1>
        {isRegister && (
          <div>
            <label>Name</label>
            <input
              type="text"
              required
              value={user.name}
              placeholder="Username"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="outline-none rounded-md p-3 w-full shadow-inner bg-teal-100 shadow-teal-600"
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            value={user.email}
            placeholder="abc@gmail.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={`outline-none rounded-md p-3 w-full shadow-inner bg-teal-100 shadow-teal-600 ${
              error.msg === "User not found." &&
              "border-2 border-red-500 border-solid"
            }`}
          />
        </div>
        <div>
          <label>Password</label>
          <div
            className={`rounded-md p-3 w-full shadow-inner bg-teal-100 shadow-teal-600 flex justify-between items-center ${
              error.msg === "Invalid credentials" &&
              "border-2 border-red-500 border-solid"
            }`}
          >
            <input
              type={showPsw ? "text" : "password"}
              required
              value={user.password}
              placeholder="******"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="outline-none bg-transparent"
            />
            <span
              onClick={() => setShowPsw(!showPsw)}
              className="text-teal-700 text-lg cursor-pointer"
            >
              {!showPsw ? <BsEyeSlashFill /> : <BsEyeFill />}
            </span>
          </div>
        </div>
        <button className="bg-teal-700 h-10 py-2 mt-4 rounded-lg text-white shadow-md shadow-black/50 hover:shadow-none ">
          {isLogin ? (
            isLoading ? (
              <PropagateLoader loading={isLoading} color="#2dd4bf" size={10} />
            ) : (
              "Login"
            )
          ) : (
            "Register"
          )}
        </button>
        {/* {error.isError && (
          <span className="text-red-500">Error:&nbsp;{error.msg}</span>
        )} */}
        <p className="text-slate-800 text-sm pl-1 ">
          {isLogin ? "Don't have an account! " : "Already have an account! "}
          &nbsp;
          <span
            className="text-red-600 underline-offset-2 underline cursor-pointer"
            onClick={toggleType}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
