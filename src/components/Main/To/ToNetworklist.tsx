import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../../../assets/img/close.png";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import polygonIcon from "../../../assets/img/chains/polygon.svg";
import fantomIcon from "../../../assets/img/chains/fantom.svg";
import {
  changeToChain,
  changeToToken,
} from "../../../features/route/routeSlice";
function ToNetworklist() {
  const dispatch = useDispatch();

  return (
    <>
      <div className='flex justify-between items-center mb-5 pb-4 border-b-[2px] border-[rgb(255, 255, 255, 0.1)] bg-clip-padding'>
        <div>
          <h4 className='font-medium text-white'>Select your network</h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=''
            onClick={() => dispatch(changeModalStatus(false))}
            className='cursor-pointer w-[15px]'
          />
        </div>
      </div>
      <div className="w-[100%]">
        <ul className="w-[100%] h-[100%] text-sm text-gray-700 dark:text-gray-200 flex justify-center items-center">
          <li className="m-2 w-[50%]">
            <div
              onClick={() => {
                dispatch(changeToChain(56));
                dispatch(changeModalStatus(false));
                dispatch(
                  changeToToken({
                    name: "",
                    adress: "",
                    image: "",
                    symbol: "",
                    decimals: 0,
                  })
                );
              }}
              className="flex flex-col items-center justify-between px-[12px] py-[15px] bg-[#22223D] mb-2 cursor-pointer hover:border-[5px] hover:border-[#814AFB]"
            >
              <img src={bnblightIcon} alt="" className="w-[56px] mb-2" />
              <span className="w-[60px] md:w-[100px] text-[12px] text-center text-white">
                BNB Chain
              </span>
            </div>
          </li>
          <li className="m-2 w-[50%]">
            <div
              onClick={() => {
                dispatch(changeToChain(250));
                dispatch(changeModalStatus(false));
                dispatch(
                  changeToToken({
                    name: "",
                    adress: "",
                    image: "",
                    symbol: "",
                    decimals: 0,
                  })
                );
              }}
              className="flex flex-col items-center justify-between px-[12px] py-[15px] bg-[#22223D] mb-2 cursor-pointer hover:border-[5px] hover:border-[#814AFB]"
            >
              <img src={fantomIcon} alt="" className="w-[56px] mb-2" />
              <span className="w-[60px] md:w-[100px] text-[12px] text-center text-white">
                Fantom
              </span>
            </div>
          </li>
          {/* <li className="m-2">
            <div
              onClick={() => {
                dispatch(changeToChain(97));
                dispatch(changeModalStatus(false));
                dispatch(
                  changeToToken({
                    name: "",
                    adress: "",
                    image: "",
                    symbol: "",
                    decimals: 0,
                  })
                );
              }}
              className="flex flex-col items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md dark:hover:text-white cursor-pointer"
            >
              <img src={bnblightIcon} alt="" className="w-[56px] mb-2" />
              <span className="w-[60px] md:w-[100px] text-[12px] text-center">
                BNB Chain Testnet
              </span>
            </div>
          </li> */}
        </ul>
      </div>
    </>
  );
}

export default ToNetworklist;
