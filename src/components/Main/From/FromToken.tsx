import React, { useEffect, useState } from "react";

function FromToken({ token, index }) {
  return (
    <div key={index} className="flex items-center justify-between my-1 cursor-pointer hover:bg-slate-200 px-5 py-3">
      <div className="w-[10%] flex justify-start">
        <img
          className="w-[24px] h-[24px] rounded-[50%]"
          alt={token.name}
          src={token.logoURI}
        />
      </div>

      <div className="w-[80%] flex flex-col items-start">
        <div className="text-[14px]">{token.symbol}</div>
        <div className="text-[14px]">{token.name}</div>
      </div>
      <div className="w-[10%] flex justify-end">0</div>
    </div>
  );
}

export default FromToken;
