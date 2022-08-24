import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import { changeFromToken } from "../../../features/route/routeSlice";

function FromToken({ token, index }) {
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const dispatch = useDispatch();
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  return (
    <div
      key={index}
      className="flex items-center justify-between my-1 cursor-pointer hover:bg-[#22223D] py-2 px-2 m-2 pl-2"
      onClick={() => {        
        dispatch(
          changeFromToken({
            name: token.name,
            symbol: token.symbol,
            adress: token.contract_addr,
            decimals: token.decimals,
          })
        );        
        dispatch(changeModalStatus(false));
      }}
    >
      <div className="w-[10%] flex justify-start">
        <img
          className="w-[24px] h-[24px] rounded-[50%]"
          alt=""
          loading="lazy"
          src={`https://assets-cdn.trustwallet.com/blockchains/${
            fromChain === 56 || fromChain === 97
              ? "smartchain"
              : fromChain === 250
              ? "fantom"
              : ""
          }/assets/${token.contract_addr}/logo.png`}
        />
      </div>

      <div className="w-[80%] flex flex-col items-start text-white">
        <div className="font-outfit font-[500] text-[14px]">{token.symbol}</div>
        <div className="font-outfit font-[500] text-[14px]">{token.name}</div>
      </div>
      {/* <div className="w-[10%] flex justify-end text-white">0</div> */}
    </div>
  );
}

export default FromToken;
