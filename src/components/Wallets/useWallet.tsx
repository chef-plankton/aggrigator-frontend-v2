import { hooks as metamaskhooks } from "../../connectors/metaMask";
import { hooks as walletconnecthooks } from "../../connectors/walletConnect";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Web3ReactHooks } from "@web3-react/core";

function useWallet() {
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const [hooks, setHooks] = useState<Web3ReactHooks>(null);
  if (wallet === "metamask") {
    setHooks(metamaskhooks);
  }
  if (wallet === "walletconnect") {
    setHooks(walletconnecthooks);
  }
  return hooks;
}

export default useWallet;
