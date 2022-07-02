import { formatEther } from "@ethersproject/units";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import useWallet from "../../components/Wallets/useWallet";
import { useERC20 } from "../../hooks/useContract";
import FromBox from "./From/FromBox";
import ToBox from "./To/ToBox";

function Main() {
  // const hooks = useWallet();
  // const { useIsActivating, useIsActive } = hooks;
  // const isActive = useIsActive();
  // console.log(isActive);

  // const erc20 = useERC20(
  //   "0x55d398326f99059fF775485246999027B3197955",
  //   isActive
  // );
  // async function name() {
  //   let salam = await erc20.balanceOf(
  //     "0xa182aab7b51232fbfabc22d989f21d264b0b246f"
  //   );
  //   console.log(Number(formatEther(salam)).toFixed(4));
  // }
  // useEffect(() => {
  //   if (isActive) {
  //     name();
  //   }
  // }, [isActive]);

  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <main
      className={`${
        themeMode === "light" ? "bg-slate-100" : "bg-[#393E46]"
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
          } transition duration-300 shadow-[0_8px_32px_#23293176]`}
        >
          Swap
        </Link>
      </div>
    </main>
  );
}

export default Main;
