import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { currentUser, logIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      console.log(currentUser);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Incorrect username or password");
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/e618016a-8be4-4b7b-8137-164bcded185b/GT-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="netflix-background"
        />
        <div className="w-full h-screen bg-black opacity-60 fixed left-0 top-0"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold mb-0">Sign In</h1>
              {error ? <p className="text-red-600">{error}</p> : null}
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex flex-col">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    id="email"
                    className="bg-gray-800 p-2 rounded mt-2"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="bg-gray-800 p-2 rounded mt-2"
                  />
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded mt-6">
                  Login
                </button>
              </form>
              <div className="flex">
                <p>
                  <input type="checkbox" className="mr-2 mt-3" />
                  Remember me
                </p>
              </div>
              <p className="mt-6">
                New to Netflix?{" "}
                <Link to="/signup">
                  <span className="text-red-600">Sign up now</span>
                </Link>
              </p>
              <p className="mt-6 text-sm">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.{" "}
                <span className="text-red-600 cursor-pointer">Learn more.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 740px) {
            .w-full {
              width: 100%;
            }
            .max-w-[450px] {
              max-width: 100%;
            }
            .h-[600px] {
              height: auto;
              max-height: calc(100vh - 96px);
            }
            .bg-black/75 {
              background-color: black;
            }
            .hidden {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Login;
