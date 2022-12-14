import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./app/store";
import { hooks as metaMaskHooks, metaMask } from "./connectors/metaMask";
import { hooks as networkHooks, network } from "./connectors/network";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "./connectors/walletConnect";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { usePollBlockNumber } from "./state/block/hooks";
import Updater from "./state/transactions/updater";
const queryClient = new QueryClient();
const connectors: [MetaMask | WalletConnect | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [network, networkHooks],
];

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function GlobalHooks() {
  usePollBlockNumber();
  return null;
}

root.render(
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Web3ReactProvider connectors={connectors}>
            <GlobalHooks />
            <Updater />
            <App />
          </Web3ReactProvider>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
