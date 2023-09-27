import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer mr-4">
            NETFLIX
          </h1>
        </Link>
      </div>
      <div className="flex items-center">
        {currentUser?.email && (
          <Link to="/account">
            <p className="text-white mr-4 flex items-end">
              {currentUser.email}
            </p>
          </Link>
        )}
        {currentUser?.email && (
          <Link to="/account">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        )}
        {currentUser?.email && (
          <button
            onClick={handleLogOut}
            className="bg-red-600 text-white px-4 py-2 rounded ml-4"
          >
            Log Out
          </button>
        )}
        {!currentUser?.email && (
          <>
            <Link to="/login">
              <button className=" text-white px-2 py-2 rounded">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="bg-red-600 text-white px-4 py-2 rounded ml-4">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
