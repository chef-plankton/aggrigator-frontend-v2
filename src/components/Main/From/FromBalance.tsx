import { hooks as metamaskhooks } from "../../../connectors/metaMask";
import { hooks as walletconnecthooks } from "../../../connectors/walletConnect";
import FromMetaMaskBalance from "./FromMetaMaskBalance";
import FromWalletConnectBalance from "./FromWalletConnectBalance";
function FromBalance() {
  const { useIsActive: metamaskUseIsActive } = metamaskhooks;
  const metamaskIsActive = metamaskUseIsActive();

  const { useIsActive: walletconnectUseIsActive } = walletconnecthooks;
  const walletconnectIsActive = walletconnectUseIsActive();
  if (metamaskIsActive) {
    return <FromMetaMaskBalance />;
  }
  if (walletconnectIsActive) {
    return <FromWalletConnectBalance />;
  } else {
    return <div>Balance: -</div>;
  }
}

export default FromBalance;
