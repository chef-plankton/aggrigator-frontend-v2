import React from "react";
import { hooks, metaMask } from "../../connectors/metaMask";
interface Props {
  setConnectWalletModalIsOpen: (value: boolean) => void;
  }
function ConnectWalletButton({setConnectWalletModalIsOpen} :Props) {
  const {
    useChainId,
    useAccounts,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = hooks;
  const isActive = useIsActive();
  const accounts = useAccounts();
  return (
    <button
      onClick={() => setConnectWalletModalIsOpen(true)}
      className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
    >
      {isActive ? accounts : "Connnect Wallet"}
    </button>
  );
}

export default ConnectWalletButton;
