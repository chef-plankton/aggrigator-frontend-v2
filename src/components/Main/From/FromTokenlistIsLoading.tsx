import React from "react";

function FromTokenlistIsLoading() {
  return (
    <div className="flex justify-center items-center flex-col mx-auto">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-x-2 border-solid border-[#1378a6] border-t-transparent my-5"
      ></div>
      <span className="text-white font-outfit font-[500] text-[14px]">Loading ...</span>
    </div>
  );
}

export default FromTokenlistIsLoading;
