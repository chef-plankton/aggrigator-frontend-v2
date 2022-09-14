import { FC, useEffect, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, walletConnect } from "../../connectors/walletConnect";
import { CHAINS, getAddChainParameters, URLS } from "../../chains";
import walletConnectIcon from "../../assets/img/wallets/walletConnect.svg";
import { useDispatch } from "react-redux";
import { changeWallet } from "../../features/account/accountSlice";
import { isMobile } from "react-device-detect";
const WalletConnectCard: FC<{
  handleClick: (e: MouseEvent<HTMLElement>) => void;
}> = ({ handleClick }) => {
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const [error, setError] = useState(undefined);

  return (
    <div
      className={`${
        isMobile ? "w-[100%]" : "w-[49%]"
      } flex flex-col items-center justify-between px-[12px] py-[15px] border-[5px] border-[#22223D] bg-[#22223D] mb-2 cursor-pointer hover:border-[5px] hover:border-[#814AFB]`}
      onClick={handleClick}
    >
      <div>
        <img src={walletConnectIcon} alt='' className='w-[32px] mb-2' />
      </div>
      <h6 className='font-medium text-[16px] text-white'>WalletConnect</h6>
    </div>
  );
};

export default WalletConnectCard;
