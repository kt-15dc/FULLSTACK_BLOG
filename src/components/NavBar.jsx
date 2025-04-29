import React from "react";

const NavBar = () => {
  return (
    <div className="bg-[#F9F8F6]">
      <div className="flex flex-row justify-between items-center mx-28">
        <h1 className="font-base text-3xl">
          {" "}
          hh<span className="text-[#12B279]">.</span>
        </h1>
        <div className="flex flex-row gap-2 py-4">
          <button className="px-10 py-3 border-1 rounded-4xl bg-[#FFFFFF] cursor-pointer hover:bg-gray-100">
            Log in
          </button>
          <button className="px-10 py-3 border-1 rounded-4xl bg-[#26231E] text-white cursor-pointer hover:bg-gray-800">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
