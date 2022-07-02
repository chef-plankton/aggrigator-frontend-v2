import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../../../assets/img/close.png";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import polygonIcon from "../../../assets/img/chains/polygon.svg";
function ToNetworklist() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between items-center mb-5 pt-5 pr-5 pl-5">
        <div>
          <h4 className="font-medium">Select your network</h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=""
            onClick={() => dispatch(changeModalStatus(false))}
            className="cursor-pointer w-[15px]"
          />
        </div>
      </div>
      <div className="w-[100%] p-5">
        <ul className="w-[100%] h-[100%] py-1 text-sm text-gray-700 dark:text-gray-200 flex justify-center items-center">
          <li className="m-2">
            <div
              onClick={() => {
                dispatch(changeModalStatus(false));
              }}
              className="flex flex-col items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md dark:hover:text-white cursor-pointer"
            >
              <img src={bnblightIcon} alt="" className="w-[56px] mb-2" />
              <span>BNB Chain</span>
            </div>
          </li>
          <li className="m-2">
            <div
              onClick={() => {
                dispatch(changeModalStatus(false));
              }}
              className="flex flex-col items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md dark:hover:text-white cursor-pointer"
            >
              <img src={polygonIcon} alt="" className="w-[56px] mb-2" />
              <span>Polygon</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ToNetworklist;
