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
import {
  changeChain,
  changeStatus,
} from "../../../features/chains/chainsSlice";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import polygonIcon from "../../../assets/img/chains/polygon.svg";
import fantomIcon from "../../../assets/img/chains/fantom.svg";
import {
  changeFromChain,
  changeFromToken,
} from "../../../features/route/routeSlice";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import useWallet from "../../Wallets/useWallet";
interface Props {
  setHidden: (value: boolean) => void;
}
function FromNetworklist() {
  const dispatch = useDispatch();

  const { useIsActive: metamaskUseIsActive } = metamaskhooks;
  const metamaskIsActive = metamaskUseIsActive();
  const { useIsActive: walletconnectUseIsActive } = walletconnecthooks;
  const walletconnectIsActive = walletconnectUseIsActive();
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const hidden = useSelector(({ chains }: RootState) => chains.isHidden);
  const web3Hooks = useWallet(wallet);
  const {
    useChainId,
    useAccount,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = web3Hooks;
  const isActive = useIsActive();
  const { login } = useAuth(web3Hooks);
  // const changeChainId = async (chainid: number) => {

  //   await login(getAddChainParameters(chainid), chainid, 'metamask')

  // if (metamaskIsActive) {
  //   dispatch(changeChain(chainid));
  //   metaMask.activate(getAddChainParameters(chainid));
  // }
  // if (walletconnectIsActive) {
  //   dispatch(changeChain(chainid));
  //   walletConnect.activate(chainid);
  // } else {
  //   dispatch(changeChain(chainid));
  // }
  // };
  const changeChainId = async (chainid: number) => {
    // dispatch(changeStatus(true));
    await login(getAddChainParameters(chainid), chainid, wallet);
    dispatch(changeFromChain(chainid));
    // dispatch(changeStatus(false));
  };
  return (
    <>
      <div className='flex justify-between items-center mb-5 pb-4 border-b-[2px] border-[#ffffff1a] bg-clip-padding'>
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
      <div className='w-[100%]'>
        <ul className='w-[100%] h-[100%] text-sm text-gray-700 dark:text-gray-200 flex justify-center items-center'>
          <li className='m-2 w-[50%]'>
            <div
              onClick={() => {
                isActive && changeChainId(56);
                dispatch(changeModalStatus(false));
                dispatch(
                  changeFromToken({
                    name: "",
                    adress: "",
                    image: "",
                    symbol: "",
                  })
                );
              }}
              className='flex flex-col items-center justify-between px-[12px] py-[15px] border-[5px] border-[#22223D] bg-[#22223D] mb-2 cursor-pointer hover:border-[5px] hover:border-[#814AFB]'
            >
              <img src={bnblightIcon} alt='' className='w-[56px] mb-2' />
              <span className='w-[60px] md:w-[100px] text-[12px] text-center text-white'>
                BNB Chain
              </span>
            </div>
          </li>
          <li className='m-2 w-[50%]'>
            <div
              onClick={() => {
                isActive && changeChainId(250);
                dispatch(changeModalStatus(false));
                dispatch(
                  changeFromToken({
                    name: "",
                    adress: "",
                    image: "",
                    symbol: "",
                  })
                );
              }}
              className='flex flex-col items-center justify-between px-[12px] py-[15px] border-[5px] border-[#22223D] bg-[#22223D] mb-2 cursor-pointer hover:border-[5px] hover:border-[#814AFB]'
            >
              <img src={fantomIcon} alt='' className='w-[56px] mb-2' />
              <span className='w-[60px] md:w-[100px] text-[12px] text-center text-white'>
                Fantom
              </span>
            </div>
          </li>
          {/* <li className='m-2'>
            <div
              onClick={() => {
                // changeChainId(97);
                dispatch(changeFromChain(97));
                dispatch(changeModalStatus(false));
                dispatch(
                  changeFromToken({
                    name: "",
                    adress: "",
                    image: "",
                    symbol: "",
                  })
                );
              }}
              className='flex flex-col items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md dark:hover:text-white cursor-pointer'
            >
              <img src={bnblightIcon} alt='' className='w-[56px] mb-2' />
              <span className='w-[60px] md:w-[100px] text-[12px] text-center'>
                BNB Chain Testnet
              </span>
            </div>
          </li> */}
        </ul>
      </div>
    </>
  );
}

export default FromNetworklist;
