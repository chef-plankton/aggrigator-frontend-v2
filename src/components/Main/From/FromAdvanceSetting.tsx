import React, { useEffect, useState } from "react";
import CloseIcon from "../../../assets/img/close.png";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import SlippageImage from "../../../assets/img/slippage.svg";

function FromAdvanceSetting() {
  const dispatch = useDispatch();
  return (
    <>
      <div className='flex justify-between items-center mb-5 pb-4 border-b-[2px] border-[rgb(255, 255, 255, 0.1)] bg-clip-padding'>
        <div>
          <h4 className='font-medium text-white'>Trade Settings</h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=''
            onClick={() => dispatch(changeModalStatus(false))}
            className='cursor-pointer w-[15px]'
          />
        </div>
      </div>{" "}
      <div className='flex flex-col items-start justify-between my-1'>
        <div className='flex justify-start items-center'>
          <span className='text-white'>Slipping telorance per swap</span>
          <img
            src={SlippageImage}
            alt='slippageimg'
            className='w-[24px] h-[24px] rounded-[50%] ml-2'
          />
        </div>
        <div className="flex justify-between w-[100%] mt-[20px]">
          <div className="bg-[#22223D] p-3 text-white hover:bg-[#814AFB] cursor-pointer">0.5%</div>
          <div className="bg-[#22223D] p-3 text-white hover:bg-[#814AFB] cursor-pointer">1%</div>
          <div className="bg-[#22223D] p-3 text-white hover:bg-[#814AFB] cursor-pointer">3%</div>
          <div className="bg-[#22223D] p-3 text-white hover:bg-[#814AFB] cursor-pointer">5%</div>
          <div className="bg-[#22223D] p-3 text-white hover:bg-[#814AFB] cursor-pointer">8%</div>
          <div className="bg-[#22223D] p-3 text-white hover:bg-[#814AFB] cursor-pointer">12%</div>
          <div className="bg-[#22223D] p-3 text-white hover:bg-[#814AFB] cursor-pointer">20%</div>
        </div>
      </div>
      {/* <div className="flex items-center justify-between my-1 px-5 py-3">
        <div className="flex justify-start items-center">
          <img
            src={TimeImage}
            alt="sdasds"
            className="w-[24px] h-[24px] rounded-[50%] mr-2"
          />
          <span>Transaction Deadline</span>
        </div>
        <div className="w-[30%]">
          <input type="text" placeholder="15min" className="w-[100%] p-2 border border-slate-300 rounded-md focus:outline-none" />
        </div>
      </div> */}
    </>
  );
}

export default FromAdvanceSetting;
