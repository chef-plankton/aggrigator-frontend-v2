import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CoinbaseWalletCard from './components/ConnectWallets/connectorCards/CoinbaseWalletCard'
import GnosisSafeCard from './components/ConnectWallets/connectorCards/GnosisSafeCard'
import MetaMaskCard from './components/ConnectWallets/connectorCards/MetaMaskCard'
import NetworkCard from './components/ConnectWallets/connectorCards/NetworkCard'
import WalletConnectCard from './components/ConnectWallets/connectorCards/WalletConnectCard'
import ProviderExample from './components/ConnectWallets/ProviderExample'
function App() {
  return (
    <>
      <Header />
      <Main />
      <ProviderExample />
      <div style={{ display: 'flex', flexFlow: 'wrap', fontFamily: 'sans-serif' }}>
        <MetaMaskCard />
        <WalletConnectCard />
        <CoinbaseWalletCard />
        <NetworkCard />
        <GnosisSafeCard />
      </div>
    </>
  );
}

export default App;
