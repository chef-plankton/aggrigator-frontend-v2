import React, { useEffect, useState } from "react";
import CloseIcon from "../../../assets/img/close.png";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import SlippageImage from "../../../assets/img/slippage.svg";
import TimeImage from "../../../assets/img/use-legacy-transactions.svg";
function FromAdvanceSetting() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-between mb-5 pt-5 pr-5 pl-5">
        <div>
          <h4 className="font-bold">Trade Settings</h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=""
            onClick={() => dispatch(changeModalStatus(false))}
            className="cursor-pointer w-[20px]"
          />
        </div>
      </div>{" "}
      <div className="flex items-center justify-between my-1 px-5 py-3">
        <div className="flex justify-start items-center">
          <img
            src={SlippageImage}
            alt="sdasds"
            className="w-[24px] h-[24px] rounded-[50%] mr-2"
          />
          <span>Slippage tolerance</span>
        </div>
        <div className="w-[30%]">
          <input type="text" placeholder="0.01" className="w-[100%] p-2 border border-slate-300 rounded-md focus:outline-none" />
        </div>
      </div>
      <div className="flex items-center justify-between my-1 px-5 py-3">
        <div className="flex justify-start items-center">
          <img
            src={TimeImage}
            alt="sdasds"
            className="w-[24px] h-[24px] rounded-[50%] mr-2"
          />
          <span>Transaction Deadline</span>
        </div>
        <div className="w-[30%]">
          <input type="text" placeholder="0.01" className="w-[100%] p-2 border border-slate-300 rounded-md focus:outline-none" />
        </div>
      </div>
    </>
  );
}

export default FromAdvanceSetting;
