import CloseIcon from "../../assets/img/close.png";
import MetaMaskCard from "./MetaMaskCard";
import DisconnectWallet from "./DisconnectWallet";
import WalletConnectCard from "./WalletConnectCard";
import { useDispatch } from "react-redux";
import { changeModalStatus } from "../../features/modals/modalsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useWallet from "./useWallet";
import { metaMask } from "../../connectors/metaMask";
import { getAddChainParameters } from "../../chains";
import { changeWallet } from "../../features/account/accountSlice";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import FromTokenlistIsLoading from "../Main/From/FromTokenlistIsLoading";
function ConnectWalletModal() {
  const dispatch = useDispatch();
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
  const isActivating = useIsActivating();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth(web3Hooks);
  const connectMetamaskHandler = async () => {
    setIsLoading(true);
    await login(getAddChainParameters(chainId), chainId, "metamask");
    setIsLoading(false);
  };
  const connectWalletConnectHandler = async () => {
    setIsLoading(true);
    await login(getAddChainParameters(chainId), chainId, "walletconnect");
    setIsLoading(false);
  };
  return (
    <>
      <div className='flex justify-between items-center mb-5 pb-4 border-b-[2px] border-[#ffffff1a] bg-clip-padding border-opacity-25'>
        <div>
          <h4
            className={`font-medium ${
              themeMode === "light" ? "text-white" : "text-white"
            }`}
          >
            Connect a Wallet
          </h4>
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
      <div className='flex flex-col w-[100%]'>
        {isActive ? (
          <DisconnectWallet />
        ) : isLoading ? (
          <FromTokenlistIsLoading />
        ) : (
          <>
            <MetaMaskCard handleClick={connectMetamaskHandler} />
            {/* <WalletConnectCard handleClick={connectWalletConnectHandler} /> */}
          </>
        )}
      </div>
    </>
  );
}

export default ConnectWalletModal;
