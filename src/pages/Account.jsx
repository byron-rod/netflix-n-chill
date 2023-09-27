import React from "react";
import MyList from "../componets/MyList.jsx";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="absolute w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/e618016a-8be4-4b7b-8137-164bcded185b/GT-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="netflix-background"
        />
        <div className="bg-black/95 fixed top-0 left-0 w-full h-[550px]"></div>
        <div className="absolute top-[45%] p-4 md:p-8">
          {/* <h1 className="text-3xl text-center my-5">My List</h1> */}

          <MyList />
        </div>
      </div>
    </>
  );
};

export default Account;
