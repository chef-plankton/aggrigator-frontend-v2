import React from "react";
import { useDispatch } from "react-redux";
import { hooks, metaMask } from "../../connectors/metaMask";
import { changeModalStatus } from "../../features/modals/modalsSlice";

function ConnectWalletButton() {
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
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(changeModalStatus(true))}
      className='py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300'
    >
      {isActive ? accounts : "Connnect Wallet"}
    </button>
  );
}

export default ConnectWalletButton;
