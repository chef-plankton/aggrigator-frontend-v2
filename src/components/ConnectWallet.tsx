import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect } from "react";

const ConnectWallet = () => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>();
  const onClick = () => {
    activate(injectedConnector);
  };

  useEffect(() => {
    console.log(chainId, account, active);
  });

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect Connect
        </button>
      )}
    </div>
  );
};


export default ConnectWallet;
