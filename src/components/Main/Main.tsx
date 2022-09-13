import { TransactionResponse } from "@ethersproject/providers";
import {
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
} from "@ethersproject/units";
import { BigNumber } from "ethers";
import { AbiCoder } from "ethers/lib/utils";
import { bool, node } from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";
import Swal from "sweetalert2";
import useSWRImmutable from "swr/immutable";
import { RootState } from "../../app/store";
import plusIcon from "../../assets/plus.png";
import NoiseIcon from "../../assets/img/Noise.png";
import { Weth } from "../../config/abi/types";
import { SwapDescriptionStruct } from "../../config/abi/types/IAkkaAggrigator";
import {
  ChainId,
  OneChainSwapDescriptionStruct,
  SwapTypes,
} from "../../config/constants/types";
import { changeApprovalState } from "../../features/account/accountSlice";
import { changeChain } from "../../features/chains/chainsSlice";
import { connectWalletStatus } from "../../features/modals/modalsSlice";
import {
  changeFromToken,
  changeResponseData,
  changeShowRoute,
} from "../../features/route/routeSlice";
import { changeSwapButtonState } from "../../features/swapbutton/swapbuttonSlice";
import {
  useAkkaAggrigatorSwapCallback,
  useAkkaCalcLayerZeroFeeCallback,
  useAkkaEncodeSwapDescriptionCallback,
} from "../../hooks/useAkkaCallback";
import {
  ApprovalState,
  useApproveCallbackFromTrade,
} from "../../hooks/useApproveCallback";
import { useCallWithoutGasPrice } from "../../hooks/useCallWithoutGasPrice";
import { useWBNBContract } from "../../hooks/useContract";
import useTokenBalance from "../../hooks/useTokenBalance";
import useWrapCallback from "../../hooks/useWrapCallback";
import MyLoader from "../MyLoader";
import useWallet from "../Wallets/useWallet";
import FromBox from "./From/FromBox";
import ReceiverBox from "./Receiver/ReceiverBox";
import Route from "./Route/Route";
import SwitchBox from "./Switcher/SwitchBox";
import ToBox from "./To/ToBox";
import FromRefresh from "./From/FromRefresh";
import FromAdvanceSettingButton from "./From/FromAdvanceSettingButton";
import InfoBox from "./Info/InfoBox";
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
const MainStyled = styled.main`
  background-color: #22223d;
  background-image: url(${NoiseIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center top;
  padding: 20px;
  @media (min-width: 960px) {
    height: 72vh;
  }
`;
enum SwapButonStates {
  CONNECT_TO_WALLET = "CONNECT_TO_WALLET",
  ENTER_AMOUNT = "ENTER_AMOUNT",
  APPROVE = "APPROVE",
  LOADING = "LOADING",
  SWAP = "SWAP",
  WRAP = "WRAP",
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
}
function Main() {
  const isLoadingRoute = useSelector(({ route }: RootState) => route.isLoading);
  const inputValue = useSelector(({ route }: RootState) => route.amount);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const amount = useSelector(({ route }: RootState) => route.amount);
  const swapDescription = useSelector(
    ({ route }: RootState) => route.swapDescription
  );
  const oneChainSwapDesc = useSelector(
    ({ route }: RootState) => route.oneChainSwapDesc
  );
  const quoteLayerZeroFeeSwapDesc = useSelector(
    ({ route }: RootState) => route.quoteLayerZeroFeeSwapDesc
  );
  const payloadEncodeSwapDesc = useSelector(
    ({ route }: RootState) => route.payloadEncodeSwapDesc
  );
  const { callWithoutGasPrice } = useCallWithoutGasPrice<
    Weth,
    TransactionResponse
  >();
  const wbnbContract = useWBNBContract(true);
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const swapButtonData = useSelector(
    ({ swapbutton }: RootState) => swapbutton.value
  );
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
  const walletChainId = useChainId();
  const account = useAccount();
  const dispatch = useDispatch();
  const wrapCallback = useWrapCallback("BNB", "WBNB");
  const { getBytes } = useAkkaEncodeSwapDescriptionCallback();
  const { quoteLayerZeroFee } = useAkkaCalcLayerZeroFeeCallback();
  const { aggrigatorSwap } = useAkkaAggrigatorSwapCallback();
  const approveState = useSelector(
    ({ account }: RootState) => account.approveState
  );
  const transactions = useSelector(
    ({ transactions }: RootState) => transactions
  );

  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const balance = useTokenBalance(fromToken.adress, account);

  const isButtonDisable = {
    disabled: swapButtonData.isDisable ? true : false,
  };
  useEffect(() => {
    if (amount === "") {
      dispatch(changeShowRoute(false));
      dispatch(changeResponseData(undefined));
    }
  }, [amount]);

  useEffect(() => {
    if (walletChainId) {
      dispatch(changeChain(walletChainId));
      if (walletChainId === ChainId.BSC) {
        dispatch(
          changeFromToken({
            name: "Wrapped BNB",
            adress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
            image: "",
            symbol: "WBNB",
            decimals: 18,
          })
        );
      }
      if (walletChainId === ChainId.FTM) {
        dispatch(
          changeFromToken({
            name: "Wrapped Fantom",
            adress: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
            image: "",
            symbol: "WFTM",
            decimals: 6,
          })
        );
      }
    }
  }, [walletChainId]);

  useEffect(() => {
    if (isActive) {
      if (
        !(fromToken.adress && toToken.adress && fromChain && toChain && amount)
      ) {
        dispatch(
          changeSwapButtonState({
            state: SwapButonStates.ENTER_AMOUNT,
            text: "Enter Amount",
            isDisable: true,
          })
        );
        return;
      }

      if (
        balance !== null &&
        balance?.lt(parseUnits(amount, fromToken.decimals))
      ) {
        dispatch(
          changeSwapButtonState({
            state: SwapButonStates.INSUFFICIENT_BALANCE,
            text: "Insufficient Balance",
            isDisable: true,
          })
        );
        return;
      }

      if (
        approvevalue !== null &&
        BigNumber.from(approvevalue)?.lt(parseUnits(amount, fromToken.decimals))
      ) {
        dispatch(
          changeSwapButtonState({
            state: SwapButonStates.APPROVE,
            text: "APPROVE",
            isDisable: false,
          })
        );
        return;
      }

      if (
        approvevalue &&
        BigNumber.from(approvevalue)?.gte(
          parseUnits(amount, fromToken.decimals)
        )
      ) {
        dispatch(
          changeSwapButtonState({
            state: SwapButonStates.SWAP,
            text: "Swap",
            isDisable: false,
          })
        );
        return;
      }
    } else {
      dispatch(
        changeSwapButtonState({
          isDisable: false,
          state: SwapButonStates.CONNECT_TO_WALLET,
          text: "Connect Wallet",
        })
      );
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
  }, [
    isActive,
    amount,
    approvevalue,
    balance,
    fromToken.adress,
    toToken.adress,
    toChain,
    fromChain,
  ]);
  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(
    fromToken.adress,
    inputValue
  );
  useEffect(() => {
    if (approveState === ApprovalState.APPROVED) {
      dispatch(
        changeSwapButtonState({
          state: SwapButonStates.SWAP,
          text: "Swap",
          isDisable: false,
        })
      );
    }
  }, [approveState, amount]);
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
    if (oneChainSwapDesc) {
      const swapDescription = JSON.parse(
        oneChainSwapDesc
      ) as SwapDescriptionStruct;
      console.log({ swapDescription });
      aggrigatorSwap(
        swapDescription,
        BigNumber.from("0"),
        new AbiCoder().encode(["string"], [""])
      ).catch((err) => {
        if (err?.code === 4001) {
          dispatch(
            changeSwapButtonState({
              state: SwapButonStates.SWAP,
              text: "Swap",
              isDisable: false,
            })
          );
        }
      });
    } else {
      const fromChainData = JSON.parse(
        quoteLayerZeroFeeSwapDesc
      ) as SwapDescriptionStruct;
      const toChainData = JSON.parse(
        payloadEncodeSwapDesc
      ) as SwapDescriptionStruct;
      console.log({ fromChainData });
      console.log({ toChainData });
      const payload = await getBytes(toChainData);
      // console.log("payload finished", payload);
      // console.log(
      //   fromChainData.routes[fromChainData.routes.length - 1]
      //     .protocolAddresses[0]
      // );
      // console.log(fromChainData.dstChainId);
      // console.log(fromChainData.to);
      // console.log(fromChainData.gasForSwap);
      // console.log(BigNumber.from(fromChainData.srcDesiredAmount).toString());
      // console.log(BigNumber.from(fromChainData.dstDesiredMinAmount).toString());

      const quote = await quoteLayerZeroFee(
        fromChainData.routes[fromChainData.routes.length - 1]
          .protocolAddresses[0],
        BigNumber.from(fromChainData.dstChainId),
        fromChainData.to,
        payload,
        fromChainData.gasForSwap as BigNumber
      );
      console.log(quote[0].toString());

      aggrigatorSwap(fromChainData, quote[0], payload).catch((err) => {
        if (err?.code === 4001) {
          dispatch(
            changeSwapButtonState({
              state: SwapButonStates.SWAP,
              text: "Swap",
              isDisable: false,
            })
          );
        }
      });
    }
  }
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
          dispatch(changeApprovalState(ApprovalState.PENDING));
          dispatch(
            changeSwapButtonState({
              state: SwapButonStates.APPROVE,
              text: "APPROVE",
              isDisable: true,
            })
          );
          break;
        case SwapButonStates.SWAP:
          multiCallSwap();
          dispatch(
            changeSwapButtonState({
              state: SwapButonStates.SWAP,
              text: "Swap",
              isDisable: true,
            })
          );

          // setSwapButtonData(prevState => ({ ...prevState, state: SwapButonStates.LOADING, text: "LOADING...", isDisable: true }));
          break;
        case SwapButonStates.CONNECT_TO_WALLET:
          dispatch(connectWalletStatus(true));
          break;
      }
    }
  };
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const showRoute = useSelector(({ route }: RootState) => route.showRoute);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <MainStyled>
      <div className='max-w-6xl mx-auto px-0 md:px-4 flex flex-col items-center pb-[35px] pt-[5px] md:pt-[35px]'>
        <div className='w-[100%] flex flex-col md:flex-row justify-center items-center'>
          <div className='w-full md:h-[420px] md:w-[550px] px-[24px] bg-[#1B1A2E] py-[24px] flex flex-col justify-center items-center'>
            <div className='text-[#ebebeb] flex justify-between w-[100%] pb-3'>
              <span className='font-clash font-[500] text-[20px]'>Swap</span>
              <div className='flex'>
                <FromAdvanceSettingButton />
                <FromRefresh />
              </div>
            </div>
            <FromBox balance={balance} account={account} />
            <SwitchBox />
            <ToBox />

            {/* <div className='w-[100%] flex mb-[10px] mt-0 pl-[5px] items-center'>
          <button
            className='w-[100%] flex items-center'
            onClick={() => setIsVisible(!isVisible)}
          >
            Send To
            <img src={plusIcon} alt='' className='w-[14px] h-[14px] ml-[6px]' />
          </button>
        </div>
        <SlideToggleContent isVisible={isVisible}>
          <ReceiverBox />
        </SlideToggleContent> */}

            <button
              onClick={handleSwapButtonClick}
              className={`rounded-[5px] py-[16px] w-[100%] h-[56px] text-center font-clash font-[400] text-[18px] text-lg ${
                !swapButtonData.isDisable
                  ? "text-white bg-[#BE35FF]/[0.45] hover:bg-[#BE35FF]/[0.65]"
                  : "text-[#717070] bg-[#979797] text-black"
              }`}
              {...isButtonDisable}
            >
              {swapButtonData.text}
            </button>
          </div>
          {showRoute ? (
            <div className='w-full md:h-[420px] md:w-[440px] px-[24px] bg-[#1B1A2E] pb-[24px] md:py-[24px] flex flex-col justify-center items-center'>
              {isLoadingRoute ? <MyLoader /> : <InfoBox />}
              {isLoadingRoute ? "" : <Route />}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </MainStyled>
  );
}

export default Main;
