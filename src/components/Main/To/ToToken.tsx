import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import { changeToToken } from "../../../features/route/routeSlice";

function ToToken({ token, index }) {
  const dispatch = useDispatch();
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  return (
    <div
      key={index}
      className="flex items-center justify-start my-1 cursor-pointer hover:bg-[#22223D] py-2 px-2 m-2 pl-2"
      onClick={() => {
        dispatch(
          changeToToken({
            name: token.name,
            symbol: token.symbol,
            adress: token.contract_addr,
            decimals: token.decimals,
          })
        );
        dispatch(changeModalStatus(false));
      }}
    >
      <div className="w-[15%] md:w-[10%] flex justify-start">
        <img
          className="w-[32px] h-[32px] rounded-[50%]"
          alt=""
          src={`https://assets-cdn.trustwallet.com/blockchains/${
            toChain === 56 || toChain === 97
              ? "smartchain"
              : toChain === 250
              ? "fantom"
              : ""
          }/assets/${token.contract_addr}/logo.png`}
        />
      </div>

      <div className="w-[75%] md:w-[80%] flex flex-col items-start text-white leading-[16px]">
        <div className="font-outfit font-[500] text-[14px]">{token.symbol}</div>
        <div className="font-outfit font-[500] text-[14px] text-[#bfbfbf]">{token.name}</div>
      </div>
      {/* <div className="w-[10%] flex justify-end text-white">0</div> */}
    </div>
  );
}

export default ToToken;
