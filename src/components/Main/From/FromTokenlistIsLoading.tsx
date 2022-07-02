import React from "react";

function FromTokenlistIsLoading() {
  return (
    <div className="flex justify-center items-center flex-col mt-[150px]">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-x-2 border-solid border-[#1378a6] border-t-transparent my-5"
      ></div>
      <span>Loading Tokens...</span>
    </div>
  );
}

export default FromTokenlistIsLoading;