import { GnosisSafe } from "@web3-react/gnosis-safe";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, metaMask } from "../../connectors/metaMask";
import { CHAINS, getAddChainParameters, URLS } from "../../chains";
function MetaMaskCard() {
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
    void metaMask.connectEagerly().catch(() => {
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
              metaMask
                .activate(getAddChainParameters(chainId))
                .then(() => setError(undefined))
                .catch(setError)
      }
    >
      <h6 className="font-semibold text-[16px]">MetaMask</h6>
      <div>
        <img
          src="https://app.uniswap.org/static/media/metamask.02e3ec27.png"
          alt=""
          className="w-[32px]"
        />
      </div>
    </div>
  );
}

export default MetaMaskCard;
