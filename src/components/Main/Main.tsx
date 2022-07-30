import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { metaMask } from "../../connectors/metaMask";
import { walletConnect } from "../../connectors/walletConnect";
import {
  useAkkaContract,
  useERC20,
  useWBNBContract,
} from "../../hooks/useContract";
import { useCallWithoutGasPrice } from "../../hooks/useCallWithoutGasPrice";
import FromBox from "./From/FromBox";
import ReceiverBox from "./Receiver/ReceiverBox";
import ToBox from "./To/ToBox";
import plusIcon from "../../assets/plus.png";
import { bool, node } from "prop-types";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import useWallet from "../Wallets/useWallet";
import { BigNumber, ethers, utils } from "ethers";
import get from "lodash/get";
import { wait } from "@testing-library/user-event/dist/utils";
import { getSigner } from "../../utils";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Weth } from "../../config/abi/types";
import useWrapCallback from "../../hooks/useWrapCallback";
import useTokenAllowance from "../../hooks/useTokenAllowance";
import { CurrencyAmount, Token } from "@pancakeswap/sdk";
import {
  ApprovalState,
  useApproveCallbackFromTrade,
} from "../../hooks/useApproveCallback";
import useSWRImmutable from "swr/immutable";
import Route from "./Route/Route";
import { connectWalletStatus } from "../../features/modals/modalsSlice";
import { TransactionResponse } from "@ethersproject/providers";
import {
  useAkkaEncodeSwapDescriptionCallback,
  useAkkaCalcLayerZeroFeeCallback,
  useAkkaAggrigatorSwapCallback,
} from "../../hooks/useAkkaCallback";
import { formatEther, parseEther } from "@ethersproject/units";
import FromToken from "./From/FromToken";
import useTokenBalance from "../../hooks/useTokenBalance";
import { setTextRange } from "typescript";
export const useCurrentBlock = (): number => {
  const { data: currentBlock = 0 } = useSWRImmutable("blockNumber");
  return currentBlock;
};
const Inner = styled.div`
  &:before,
  &:after {
    content: "";
    display: table;
  }
`;
enum SwapButonStates {
  CONNECT_TO_WALLET = "CONNECT_TO_WALLET",
  ENTER_AMOUNT = "ENTER_AMOUNT",
  APPROVE = "APPROVE",
  LOADING = "LOADING",
  SWAP = "SWAP",
  WRAP = "WRAP",
}
function Main() {
  const inputValue = useSelector(({ route }: RootState) => route.amount);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const amount = useSelector(({ route }: RootState) => route.amount);
  const { callWithoutGasPrice } = useCallWithoutGasPrice<
    Weth,
    TransactionResponse
  >();
  const wbnbContract = useWBNBContract(true);
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const approvevalue = useSelector(
    ({ account }: RootState) => account.approvevalue
  );
  const {
    useChainId,
    useAccount,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = useWallet(wallet);
  const isActive = useIsActive();
  const library = useProvider();
  const account = useAccount();
  const dispatch = useDispatch();
  const wrapCallback = useWrapCallback("BNB", "WBNB");
  const [swapButtonData, setSwapButtonData] = useState<{ text: string, isDisable?: boolean, state: SwapButonStates }>({ text: "", isDisable: false, state: null });
  const { getBytes } = useAkkaEncodeSwapDescriptionCallback();
  const { quoteLayerZeroFee } = useAkkaCalcLayerZeroFeeCallback();
  const { aggrigatorSwap } = useAkkaAggrigatorSwapCallback();
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const balance = useTokenBalance(fromToken.adress, account)
  useEffect(() => {

    if (isActive) {
      if (!(fromToken.adress &&
        toToken.adress &&
        fromChain &&
        toChain &&
        amount)) {
        setSwapButtonData(prevState => ({ ...prevState, state: SwapButonStates.ENTER_AMOUNT, text: "Enter Amount", isDisable: true }));
        return
      }
      if (
        approvevalue && approvevalue?.lt(parseEther(amount))) {
        setSwapButtonData(prevState => ({ ...prevState, state: SwapButonStates.APPROVE, text: "APPROVE" }));
        return
      }
      if (
        approvevalue && approvevalue?.gte(parseEther(amount))) {
        setSwapButtonData(prevState => ({ ...prevState, state: SwapButonStates.SWAP, text: "Swap" }));
        return
      }
    } else {
      setSwapButtonData(prevState => ({ ...prevState, state: SwapButonStates.CONNECT_TO_WALLET, text: "Connect To Wallet" }));
    }



    // if (approvevalue && approvevalue?.gte(parseEther(amount))) {
    //   setText({te"Swap"});
    //   return
    // } else if (balance?.lt(parseEther(amount))) {
    //   setText("Insufficient Balance");
    //   return
    // } else if (!amount) {
    //   setText("Enter Amount");
    //   return
    // } else {
    //   setText("Approve");
    //   return
    // }




  }, [isActive, amount, approvevalue, balance, fromToken.adress, toToken.adress, toChain, fromChain]);
  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(
    fromToken.adress,
    inputValue
  );
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);
  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  const currentBlock = useCurrentBlock();
  async function getCurrentBlock() {
    // const contractWithSigner = wbnbContract.connect(
    //   getSigner(library, account)
    // );
    // contractWithSigner
    //   .allowance(account, "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3", {
    //     gasLimit: 21000000,
    //   })
    //   .then((result) => {
    //     console.log(ethers.utils.parseUnits(inputValue).toString());
    //     console.log(result.toString());

    //     if (result < ethers.utils.parseUnits(inputValue)) {
    //       const contractWithSigner = wbnbContract.connect(
    //         getSigner(library, account)
    //       );
    //       contractWithSigner.approve(
    //         "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
    //         ethers.utils.parseUnits(inputValue, 18),
    //         {
    //           gasLimit: 21000000,
    //         }
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    if (
      fromChain === 97 &&
      toChain === 97 &&
      fromToken.adress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" &&
      toToken.adress === "0xae13d989dac2f0debff460ac112a837c89baa7cd" &&
      inputValue !== ""
    ) {
      try {
        wrapCallback.execute();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! \n Please make sure your wallet is connected to our website",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        console.error("Could not deposit", error);
      }
    }
  }
  async function multiCallSwap() {
    const payload = await getBytes();
    const quote = await quoteLayerZeroFee(payload);
    console.log(quote[0].toString());
    aggrigatorSwap(quote[0], payload);
  }
  // Connect to Metamask wallet automatically after refreshing the page (attempt to connect eagerly on mount)
  // const hooks = useWallet();
  // const { useIsActivating, useIsActive } = hooks;
  // const isActive = useIsActive();
  // console.log(isActive);

  // const erc20 = useERC20(
  //   "0x55d398326f99059fF775485246999027B3197955",
  //   isActive
  // );
  // async function name() {
  //   let salam = await erc20.balanceOf(
  //     "0xa182aab7b51232fbfabc22d989f21d264b0b246f"
  //   );
  //   console.log(Number(formatEther(salam)).toFixed(4));
  // }
  // useEffect(() => {
  //   if (isActive) {
  //     name();
  //   }
  // }, [isActive]);
  /** The children of this component will slide down on mount and will slide up on unmount */
  const visibleStyle = {
    height: "auto",
    opacity: 1,
    overflow: "visible",
    width: "100%",
  };
  const hiddenStyle = { opacity: 0, height: 0, overflow: "hidden" };
  function getElementHeight(ref) {
    return ref.current ? ref.current.getBoundingClientRect().height : 0;
  }

  const SlideToggleContent = ({ isVisible, children, forceSlideIn }) => {
    const isVisibleOnMount = useRef(isVisible && !forceSlideIn);
    const containerRef = useRef(null);
    const innerRef = useRef(null);
    const transitions = useTransition(isVisible, {
      enter: () => async (next, cancel) => {
        const height = getElementHeight(innerRef);

        cancel();

        await next({ height, opacity: 1, overflow: "hidden" });
        await next(visibleStyle);
      },
      leave: () => async (next, cancel) => {
        const height = getElementHeight(containerRef);

        cancel();

        await next({ height, overflow: "hidden" });
        await next(hiddenStyle);

        isVisibleOnMount.current = false;
      },
      from: isVisibleOnMount.current ? visibleStyle : hiddenStyle,
      unique: true,
    });
    return transitions(
      (styles, item) =>
        item && (
          <animated.div ref={containerRef} style={styles}>
            <Inner ref={innerRef}>{children}</Inner>
          </animated.div>
        )
    );
  };
  SlideToggleContent.defaultProps = {
    forceSlideIn: false,
  };
  SlideToggleContent.propTypes = {
    /** Should the component mount it's childeren and slide down */
    isVisible: bool.isRequired,
    /** Makes sure the component always slides in on mount. Otherwise it will be immediately visible if isVisible is true on mount */
    forceSlideIn: bool,
    /** The slidable content elements */
    children: node.isRequired,
  };
  const handleSwapButtonClick = async () => {
    if (!isActive) {
      dispatch(connectWalletStatus(true));
    } else {
      switch (swapButtonData.state) {
        case SwapButonStates.APPROVE:
          approveCallback();
          break
        case SwapButonStates.SWAP:
          multiCallSwap();
          break
        case SwapButonStates.SWAP:
          dispatch(connectWalletStatus(true))
          break
      }
    }
  }
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <main
      className={`${themeMode === "light" ? "bg-slate-100" : "bg-[#393E46]"
        } shadow-lg z-10`}
    >
      <div className="max-w-3xl mx-auto px-4 min-h-screen flex flex-col items-center pb-[100px] pt-[50px] md:pt-[50px]">
        <FromBox />
        <ToBox />
        <div className="w-[100%] flex mb-[30px] mt-0 pl-[5px] items-center">
          <button
            className="w-[100%] flex items-center"
            onClick={() => setIsVisible(!isVisible)}
          >
            Send To
            <img src={plusIcon} alt="" className="w-[14px] h-[14px] ml-[6px]" />
          </button>
        </div>
        <SlideToggleContent isVisible={isVisible}>
          <ReceiverBox />
        </SlideToggleContent>
        <Route />

        <button
          onClick={handleSwapButtonClick}
          className={`mt-[20px] py-4 w-[100%] text-center font-medium text-lg text-white rounded-[10px] ${themeMode === "light"
            ? "bg-[#111111] hover:bg-[transparent] hover:text-[#111111] hover:shadow-none hover:border-[1px] hover:border-black"
            : "bg-[#4ECCA3] hover:bg-[#79d8b8]"
            } transition duration-300 shadow-[0_8px_32px_#23293176]`}
        >
          {swapButtonData.text}
        </button>
      </div>
    </main>
  );
}

export default Main;
