import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../../../assets/img/close.png";
import { changeModalStatus } from "../../../features/modals/modalsSlice";

function ToNetworklist() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between mb-5 pt-5 pr-5 pl-5">
        <div>
          <h4 className="font-bold">Select your network</h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=""
            onClick={() => dispatch(changeModalStatus(false))}
            className="cursor-pointer w-[20px]"
          />
        </div>
      </div>
      <div className="flex flex-col w-[100%] overflow-y-scroll px-5">
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <div className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
              <img
                src="https://app.1inch.io/assets/images/network-logos/binance-light_2.svg"
                alt=""
                className="w-5 mr-1"
              />
              BNB Chain
            </div>
          </li>
          <li>
            <div className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
              <img
                src="https://app.1inch.io/assets/images/network-logos/polygon.svg"
                alt=""
                className="w-5 mr-1"
              />
              Polygon
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ToNetworklist;
