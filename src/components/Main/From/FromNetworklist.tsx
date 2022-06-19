import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../../../assets/img/close.png";
import { getAddChainParameters } from "../../../chains";
import { hooks as metamaskhooks, metaMask } from "../../../connectors/metaMask";
import {
  hooks as walletconnecthooks,
  walletConnect,
} from "../../../connectors/walletConnect";
import { changeChain } from "../../../features/chains/chainsSlice";
import { changeModalStatus } from "../../../features/modals/modalsSlice";

function FromNetworklist() {
  const dispatch = useDispatch();
  const { useIsActive: metamaskUseIsActive } = metamaskhooks;
  const metamaskIsActive = metamaskUseIsActive();
  const { useIsActive: walletconnectUseIsActive } = walletconnecthooks;
  const walletconnectIsActive = walletconnectUseIsActive();
  const changeChainId = (chainid: number) => {
    if (metamaskIsActive) {
      dispatch(changeChain(chainid));
      metaMask.activate(getAddChainParameters(chainid));
    }
    if (walletconnectIsActive) {
      dispatch(changeChain(chainid));
      walletConnect.activate(chainid);
      console.log(walletConnect.activate(chainid));
    } else {
      dispatch(changeChain(chainid));
    }
  };
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
            <div
              onClick={() => {
                changeChainId(56);
              }}
              className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              <img
                src="https://app.1inch.io/assets/images/network-logos/binance-light_2.svg"
                alt=""
                className="w-5 mr-1"
              />
              BNB Chain
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                changeChainId(137);
              }}
              className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
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

export default FromNetworklist;
