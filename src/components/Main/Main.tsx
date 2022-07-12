import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { metaMask } from "../../connectors/metaMask";
import { walletConnect } from "../../connectors/walletConnect";
import { useERC20, useWBNBContract } from "../../hooks/useContract";
import { useCallWithoutGasPrice } from "../../hooks/useCallWithoutGasPrice";
import FromBox from "./From/FromBox";
import ReceiverBox from "./Receiver/ReceiverBox";
import ToBox from "./To/ToBox";
import plusIcon from "../../assets/plus.png";
import { bool, node } from "prop-types";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import useWallet from "../Wallets/useWallet";
import { useApprove } from "../../hooks/useApprove";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Weth } from "../../config/abi/types";
import useWrapCallback from "../../hooks/useWrapCallback";
import useSWRImmutable from 'swr/immutable'


export const useCurrentBlock = (): number => {
  const { data: currentBlock = 0 } = useSWRImmutable('blockNumber')
  return currentBlock
}

function Main() {
  const inputValue = useSelector(({ route }: RootState) => route.amount);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const { callWithoutGasPrice } = useCallWithoutGasPrice<Weth>();
  const { approve } = useApprove();
  const wbnbContract = useWBNBContract(true);
  const { useProvider, useAccount, useChainId } = useWallet("metamask");
  const library = useProvider();
  const account = useAccount();
  const dispatch = useDispatch();
  const wrapCallback = useWrapCallback("BNB", "WBNB");
  const currentBlock = useCurrentBlock()
  
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
    console.log(currentBlock);

    if (
      fromChain === 97 &&
      toChain === 97 &&
      fromToken.adress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" &&
      toToken.adress === "0xae13d989dac2f0debff460ac112a837c89baa7cd" &&
      inputValue !== ""
    ) {
      console.log('man tu if am');
      
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

  // Connect to Metamask wallet automatically after refreshing the page (attempt to connect eagerly on mount)
  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
    void walletConnect.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);
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
  const Inner = styled.div`
    &:before,
    &:after {
      content: "";
      display: table;
    }
  `;
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

  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <main
      className={`${
        themeMode === "light" ? "bg-slate-100" : "bg-[#393E46]"
      } shadow-lg z-10`}
    >
      <div className="max-w-6xl mx-auto px-4 min-h-screen flex flex-col items-center pb-[100px] pt-[50px] md:pt-[100px]">
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

        <button
          onClick={() => getCurrentBlock()}
          className={`mt-[20px] py-4 w-[100%] text-center font-medium text-lg text-white rounded-[10px] ${
            themeMode === "light"
              ? "bg-[#111111] hover:bg-[transparent] hover:text-[#111111] hover:shadow-none hover:border-[1px] hover:border-black"
              : "bg-[#4ECCA3] hover:bg-[#79d8b8]"
          } transition duration-300 shadow-[0_8px_32px_#23293176]`}
        >
          Swap
        </button>
      </div>
    </main>
  );
}

export default Main;
