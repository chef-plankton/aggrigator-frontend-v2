import { hooks as metamaskhooks } from "../../connectors/metaMask";
import { hooks as walletconnecthooks } from "../../connectors/walletConnect";
import { useEffect, useState } from "react";
import { Web3ReactHooks } from "@web3-react/core";
import { WalletName } from "../../features/account/accountSlice";

function useWallet(wallet: WalletName) {
  const [hooks, setHooks] = useState<Web3ReactHooks>(metamaskhooks);
  useEffect(() => {
    if (wallet === "metamask") {
      setHooks(metamaskhooks);
    }
    if (wallet === "walletconnect") {
      setHooks(walletconnecthooks);
    }
  }, [wallet]);

  return hooks;
}

export default useWallet;
