import React from "react";
import {
  AiFillEnvironment,
  AiOutlinePhone
} from "react-icons/ai";

export const TopHeader = () => {
  return (
    <div className="w-full h-12 bg-[#202331] text-white/70 text-sm">
      <div className="container mx-auto flex h-full items-center justify-center sm:justify-between ">
        <p className="hidden sm:block">Welcome to STEM Coding Lab ACSES!</p>
        <div className="flex space-x-2 ">
          <p className="flex items-center">
            <AiOutlinePhone /> <span className="ps-1">+1 412-426-3523</span>
          </p>
          <p className="flex items-center">
          <AiFillEnvironment /><span className="ps-1">800 Vinial Street, Suite B307, Pittsburgh, PA 15212</span>
          </p>
        </div>
      </div>
    </div>
  );
};
