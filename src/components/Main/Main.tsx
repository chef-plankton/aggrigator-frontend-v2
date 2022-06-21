import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import FromBox from "./From/FromBox";
import ToBox from "./To/ToBox";

function Main() {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <main
      className={`${
        themeMode === "light" ? "bg-white" : "bg-[#393E46]"
      } shadow-lg z-10`}
    >
      <div className="max-w-6xl mx-auto px-4 min-h-screen flex flex-col items-center pb-[100px] pt-[50px] md:pt-[100px]">
        <FromBox />
        <ToBox />
        <Link
          to="/24"
          className={`mt-[20px] py-4 w-[100%] text-center font-medium text-lg text-white rounded-[10px] ${
            themeMode === "light"
              ? "bg-[#4ECCA3] hover:bg-[#79d8b8]"
              : "bg-[#4ECCA3] hover:bg-[#79d8b8]"
          } transition duration-300 shadow-[0_8px_32px_rgba(31,38,135,0.37)]`}
        >
          Swap
        </Link>
      </div>
    </main>
  );
}

export default Main;
