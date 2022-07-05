import React from "react";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import { changeToToken } from "../../../features/route/routeSlice";

function ToToken({ token, index }) {
  const dispatch = useDispatch();
  return (
    <div
      key={index}
      className="flex items-center justify-between my-1 cursor-pointer hover:bg-slate-200 px-3 py-2 m-2 rounded-md"
      onClick={() => {
        dispatch(
          changeToToken({
            name: token.name,
            adress: token.address,
            image: token.logoURI,
          })
        );
        dispatch(changeModalStatus(false));
      }}
    >
      <div className="w-[10%] flex justify-start">
        <img
          className="w-[24px] h-[24px] rounded-[50%]"
          alt=""
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

export default ToToken;
