import { hooks as metamaskhooks } from "../../connectors/metaMask";
import { hooks as walletconnecthooks } from "../../connectors/walletConnect";
import { initializeConnector } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";
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
