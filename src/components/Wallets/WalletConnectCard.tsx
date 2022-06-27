import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, walletConnect } from "../../connectors/walletConnect";
import { CHAINS, getAddChainParameters, URLS } from "../../chains";
import walletConnectIcon from "../../assets/img/wallets/walletConnect.svg";
function WalletConnectCard() {
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

  // attempt to connect eagerly on mount
  useEffect(() => {
    void walletConnect.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  return (
    <div
      className="flex items-center justify-between border-[1px] rounded-xl border-[#D3D3D3] px-[12px] py-[15px] bg-[#edeef2] mb-2 cursor-pointer"
      onClick={
        isActive
          ? undefined
          : isActivating
          ? undefined
          : () =>
              walletConnect
                .activate(chainId)
                .then(() => setError(undefined))
                .catch(setError)
      }
    >
      <h6 className="font-medium text-[16px]">WalletConnect</h6>
      <div>
        <img src={walletConnectIcon} alt="" className="w-[32px]" />
      </div>
    </div>
  );
}

export default WalletConnectCard;
