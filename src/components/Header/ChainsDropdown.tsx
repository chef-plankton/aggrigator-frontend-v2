import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { changeChain } from "../../features/chains/chainsSlice";
import { hooks as metamaskhooks, metaMask } from "../../connectors/metaMask";
import {
  hooks as walletconnecthooks,
  walletConnect,
} from "../../connectors/walletConnect";
import { getAddChainParameters } from "../../chains";
import bnblightIcon from "../../assets/img/chains/binance-light.svg";
import polygonIcon from "../../assets/img/chains/polygon.svg";
import fantomIcon from "../../assets/img/chains/fantom.svg";
import useAuth from "../../hooks/useAuth";
import useWallet from "../Wallets/useWallet";
import { useState } from "react";
interface Props {
  setDropdown: (value: boolean) => void;
  setHidden: (value: boolean) => void;
}
function ChainsDropdown({ setDropdown, setHidden }: Props) {
  const chainId = useSelector(({ chains }: RootState) => chains.value);

  const wallet = useSelector(({ account }: RootState) => account.wallet);

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

  const dispatch = useDispatch();
  const { login } = useAuth(web3Hooks);

  const changeChainId = async (chainid: number) => {
    setHidden(true);
    await login(getAddChainParameters(chainid), chainid, wallet);
    setHidden(false);
  };
  return (
    <div className='z-10 bg-[#1B1A2E] divide-y divide-gray-100 rounded shadow w-44 dark:bg-[#22223D] chainslistdrowdown'>
      <ul className='py-1 text-sm text-[white]'>
        <li>
          <div
            onClick={() => {
              changeChainId(56);
              setDropdown(false);
            }}
            className='flex items-center px-4 py-2 hover:bg-[#22223D] dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
          >
            <img src={bnblightIcon} alt='' className='w-[24px] mr-2' />
            BNB Chain
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              changeChainId(250);
              setDropdown(false);
            }}
            className='flex items-center px-4 py-2 hover:bg-[#22223D] dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
          >
            <img src={fantomIcon} alt='' className='w-[24px] mr-2' />
            Fantom
          </div>
        </li>

        <li>
          <div
            onClick={() => {
              changeChainId(97);
              setDropdown(false);
            }}
            className='flex items-center px-4 py-2 hover:bg-[#22223D] dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
          >
            <img src={bnblightIcon} alt='' className='w-[24px] mr-2' />
            BSC Testnet
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ChainsDropdown;
