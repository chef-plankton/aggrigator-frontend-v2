import { FC, useEffect, useState,MouseEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, walletConnect } from "../../connectors/walletConnect";
import { CHAINS, getAddChainParameters, URLS } from "../../chains";
import walletConnectIcon from "../../assets/img/wallets/walletConnect.svg";
import { useDispatch } from "react-redux";
import { changeWallet } from "../../features/account/accountSlice";
const WalletConnectCard: FC<{
  handleClick: (e: MouseEvent<HTMLElement>) => void;
}> = ({handleClick}) => {
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


  const dispatch = useDispatch();
  return (
    <div
      className="flex items-center justify-between border-[1px] rounded-xl border-[#D3D3D3] px-[12px] py-[15px] bg-[#edeef2] mb-2 cursor-pointer"
      onClick={handleClick}
    >
      <h6 className="font-medium text-[16px]">WalletConnect</h6>
      <div>
        <img src={walletConnectIcon} alt="" className="w-[32px]" />
      </div>
    </div>
  );
}

export default WalletConnectCard;
