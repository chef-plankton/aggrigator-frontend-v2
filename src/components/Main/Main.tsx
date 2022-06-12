import React from "react";
import { Link } from "react-router-dom";
import FromBox from "./From/FromBox";
import ToBox from "./To/ToBox";

function Main() {
  return (
    <main className="bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 min-h-screen flex flex-col items-center pb-[100px] pt-[50px]">
        <FromBox />
        <ToBox />
        <Link
          to="/24"
          className="mt-[20px] py-4 w-[100%] text-center font-medium text-lg text-white bg-green-500 rounded-[10px] hover:bg-green-400 transition duration-300 shadow-[0_8px_32px_rgba(31,38,135,0.37)]"
        >
          Connect Wallet
        </Link>
      </div>
    </main>
  );
}

export default Main;
