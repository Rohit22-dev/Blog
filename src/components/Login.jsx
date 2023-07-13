"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/slice";

const Login = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const [type, setType] = useState("Login");
  const isLogin = type === "Login";
  const isRegister = type === "Register";
  const dispatch = useDispatch();

  const toggleType = () => {
    setType(type === "Login" ? "Register" : "Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      try {
        console.log(user);
        await fetch("http://localhost:8080/auth/register", {
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
        const { email, password } = user;
        const res = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        console.log(data);
        dispatch(setLogin(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-img">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-5 bg-teal-400 rounded-lg shadow-lg shadow-black/25 "
      >
        <h1 className="text-center text-xl font-semibold text-teal-900">
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
              className="outline-none rounded-md p-1 w-full shadow-inner bg-teal-100 shadow-teal-600"
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
            className="outline-none rounded-md p-1 w-full shadow-inner bg-teal-100 shadow-teal-600"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            value={user.password}
            placeholder="******"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="outline-none rounded-md p-1 w-full shadow-inner bg-teal-100 shadow-teal-600 "
          />
        </div>
        <button className="bg-teal-700 py-2 mt-4 rounded-lg text-white shadow-md shadow-black/50 hover:shadow-none">
          {isLogin ? "Login" : "Register"}
        </button>
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
