import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import GeneralModal from "./components/Modals/GeneralModal";
import useWallet from "./components/Wallets/useWallet";
import { metaMask } from "./connectors/metaMask";
import { walletConnect } from "./connectors/walletConnect";
import { changeAddress, changeWallet } from "./features/account/accountSlice";
import { changeFromChain } from "./features/route/routeSlice";
import useAuth from "./hooks/useAuth";

function App() {
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const dispatch = useDispatch();
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const { useAccount } = useWallet(wallet);
  const account = useAccount();
  // useEffect(() => {
  //   if (wallet === "metamask") {
  //     console.log("im in metamask");
  //     void metaMask
  //       .connectEagerly()
  //       .then(() => {
  //         dispatch(changeWallet("metamask"));
  //         dispatch(changeFromChain(chainId));

  //         dispatch(changeAddress(account));
  //       })
  //       .catch(() => {
  //         console.debug("Failed to connect eagerly to metamask");
  //       });
  //   }
  //   if (wallet === "walletconnect") {
  //     console.log("im in wallet connect");
  //     void walletConnect
  //       .connectEagerly()
  //       .then(() => {
  //         dispatch(changeWallet("walletconnect"));
  //         dispatch(changeFromChain(chainId));
  //         dispatch(changeAddress(account));
  //       })
  //       .catch(() => {
  //         console.debug("Failed to connect eagerly to walletConnect");
  //       });
  //   }
  // }, [chainId]);
  useEffect(() => {
    console.log("sar meta");
    // void metaMask
    //   .connectEagerly()
    //   .then(() => {
    //     dispatch(changeWallet("metamask"));
    //     dispatch(changeFromChain(chainId));
    //     dispatch(changeAddress(account));
    //   })
    //   .catch(() => {
    //     console.debug("Failed to connect eagerly to metamask");
    //   });
    console.log("sar wallectconnect");
    void walletConnect
      .connectEagerly()
      .then(() => {
        dispatch(changeWallet("walletconnect"));
        dispatch(changeFromChain(chainId));
        dispatch(changeAddress(account));
      })
      .catch(() => {
        console.debug("Failed to connect eagerly to walletConnect");
      });
    console.log("tah wallectconnect");
  }, [chainId]);

  return (
    <div className='min-h-screen'>
      <Header />
      <Main />
      <Footer />
      <GeneralModal />
    </div>
  );
}

export default App;
