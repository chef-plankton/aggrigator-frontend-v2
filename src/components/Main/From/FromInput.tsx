import { parseUnits } from "@ethersproject/units";
import axios from "axios";
import { BigNumber } from "ethers";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import {
  RouteDescriptionStruct,
  SwapDescriptionStruct,
} from "../../../config/abi/types/AkkaAggrigator";
import { getPriceOfToken } from "../../../config/api";
import {
  NetworkName,
  RouteRegularOperations,
  RouteResponseDto,
  RouteStargateBridgeOperations,
  SwapTypes,
} from "../../../config/constants/types";
import {
  changeAmount,
  changeIsLoading,
  changeRecieve,
  changeResponseData,
  changeResponseString,
  changeShowRoute,
  changeSwapDescription,
} from "../../../features/route/routeSlice";
import getContractWithChainId from "../../../hooks/useSetContractWithChainId";
import useWallet from "../../Wallets/useWallet";
const StyledInput = styled.input`
  position: relative;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 20px;
  padding: 0px;
  display: block;
  color: "palevioletred";
  background: none;
  border: none;
  outline: none;
  border-bottom: 1px solid ${({ color }) => (color ? color : "#757575")};
  border-radius: 3px;
  width: 90%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  appearance: textfield;
  @media (max-width: 768px) {
    width: 100%;
  }
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 16px;
  }
  :-ms-input-placeholder {
    font-size: 16px;
  }
`;
function test(n: number, decimal: number) {
  // return parseUnits(n.toFixed(decimal), decimal)
  return BigNumber.from("0");
}
interface FromInputProps {
  balance: number | string;
}
const FromInput: FC<FromInputProps> = ({ balance }) => {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const amount = useSelector(({ route }: RootState) => route.amount);
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const counter = useSelector(({ route }: RootState) => route.counter);
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const akkaContractAddress = getContractWithChainId(toChain);
  const Connectedwallet = useWallet(wallet);
  const { useAccount, useChainId } = Connectedwallet;
  const account = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {
    if (fromToken.adress !== "" && toToken.adress !== "" && amount !== "") {
      dispatch(changeIsLoading(true));
      axios
        .get(
          `https://www.api.akka.finance/route?token0=${fromToken.adress}&chain0=${
            fromChain === 56 ? "bsc" : fromChain === 250 ? "fantom" : ""
          }&token1=${toToken.adress}&chain1=${
            toChain === 56 ? "bsc" : toChain === 250 ? "fantom" : ""
          }&amount=${amount}`
        )
        .then((data) => {
          dispatch(changeResponseString(JSON.stringify(data)));
          dispatch(changeResponseData(data));
          dispatch(changeShowRoute(true));
          // dispatch(changech(true));

          dispatch(
            changeSwapDescription(
              JSON.stringify(
                convertResponseDataToSwapDescriptionStruct(data.data)
              )
            )
          );
        })
        .finally(() => {
          dispatch(changeIsLoading(false));
        });
    }
  }, [amount, fromChain, toChain, fromToken, toToken, chainId, counter]);
  useEffect(() => {
    if (fromToken.adress !== "" && toToken.adress !== "" && amount !== "") {
      getPriceOfToken("BTC").then(console.log).catch(console.log);
    }
  }, [amount, fromChain, toChain, fromToken, toToken, chainId, counter]);
  const convertResponseDataToSwapDescriptionStruct = (
    resData: RouteResponseDto
  ) => {
    let swapDescription: SwapDescriptionStruct;
    let swapDescription2: SwapDescriptionStruct;
    swapDescription = {
      ...swapDescription,
      dstChainId: 0,
      dstPoolId: 0,
      srcPoolId: 0,
      gasForSwap: BigNumber.from("1705617"),
      dstContractAddress: akkaContractAddress,
      to: account,
    };
    resData.routes[0].operations_seperated.forEach(
      ({ chain, chain_id, gas_fee, operations }) => {
        swapDescription = {
          ...swapDescription,
        };
        operations.forEach((data) => {
          switch (chain as NetworkName) {
            case NetworkName.FTM.toLowerCase():
            case NetworkName.BSC.toLowerCase():
              {
                let route0: RouteDescriptionStruct;

                const routeRegularOperations = new RouteRegularOperations({
                  ...data,
                });
                if (routeRegularOperations instanceof RouteRegularOperations) {
                  const {
                    amount_in,
                    amount_out,
                    ask_token,
                    contract_addr,
                    exchange,
                    offer_token,
                    router_addr,
                  } = routeRegularOperations;

                  route0 = {
                    srcToken: offer_token[0],
                    dstToken: ask_token[0],
                    srcAmount: test(amount_in, +offer_token[4]),
                    dstMinAmount: test(amount_out, +offer_token[4]),
                    path: [offer_token[0], ask_token[0]],
                    router: router_addr,
                    swapType: SwapTypes.Regular,
                  };
                  swapDescription = {
                    ...swapDescription,
                  };
                }

                if (swapDescription?.routes === undefined) {
                  swapDescription = {
                    ...swapDescription,
                    routes: [route0],
                  };
                } else {
                  swapDescription = {
                    ...swapDescription,
                    routes: [...swapDescription.routes, route0],
                  };
                }
              }

              break;
            case NetworkName.BRIDGE.toLowerCase():
              {
                const routeStargateBridgeOperations =
                  new RouteStargateBridgeOperations({ ...data });
                if (
                  routeStargateBridgeOperations instanceof
                  RouteStargateBridgeOperations
                ) {
                  const {
                    ask_token,
                    exchange,
                    offer_token,
                    ask_bridge_data,
                    offer_bridge_data,
                    amount_in,
                    amount_out,
                    contract_addr,
                    router_addr,
                  } = routeStargateBridgeOperations;
                  let route0: RouteDescriptionStruct;

                  route0 = {
                    srcToken: offer_token[0],
                    dstToken: ask_token[0],
                    srcAmount: test(amount_in, +offer_token[4]),
                    dstMinAmount: test(amount_out, +offer_token[4]),
                    path: [offer_token[0], ask_token[0]],
                    router: router_addr,
                    swapType: SwapTypes.StargateBridge,
                  };

                  swapDescription = {
                    ...swapDescription,
                    // srcToken: operations[0].offer_token[0],
                    // dstToken: operations[operations.length - 1].ask_token[0],
                    dstChainId: ask_bridge_data.chain_id,
                    dstPoolId: ask_bridge_data.pool_id,
                    srcPoolId: offer_bridge_data.pool_id,
                    // isRegularTransfer: ,
                  };
                  // s s s b
                  // s s s b s
                  if (swapDescription?.routes === undefined) {
                    swapDescription = {
                      ...swapDescription,
                      routes: [route0],
                    };
                  } else {
                    swapDescription = {
                      ...swapDescription,
                      routes: [...swapDescription.routes, route0],
                    };
                  }
                }
              }

              break;
            default:
              break;
          }
        });

        // if (chain === NetworkName.BSC.toLowerCase()){

        // }
      }
    );
    swapDescription = { ...swapDescription, isRegularTransfer: true };
    swapDescription?.routes.forEach((s, index, arr) => {
      if (s.swapType === SwapTypes.StargateBridge) {
        if (arr[index + 1] !== undefined) {
          swapDescription = { ...swapDescription, isRegularTransfer: false };
        }
      }

      if (index === 0) {
        const operations = resData.routes[0].operations;
        swapDescription = {
          ...swapDescription,
          srcToken: arr[0].srcToken,
          dstToken: arr[arr.length - 1].dstToken,
          srcDesiredAmount: parseUnits(
            resData.input_amount.toString(),
            +operations[0].offer_token[4]
          ),
          dstDesiredMinAmount: parseUnits(
            resData.return_amount.toString(),
            +operations[operations.length - 1].ask_token[4]
          ),
        };
      }
    });
    console.log({ swapDescription });

    return swapDescription;
  };
  return (
    <>
      <StyledInput
        color={themeMode === "light" ? "black" : "white"}
        placeholder='Enter amount you want to sell'
        value={amount}
        onChange={(e) => {
          const value = e.target.value;
          if (value === ".") {
            return;
          }
          if (/^\d*\.?\d*$/.test(value)) {
            dispatch(changeAmount(value));
          }

          if (!/[0-9]/.test(value)) {
          }

          if (
            (fromToken.name === "BNB" && toToken.name === "WBNB") ||
            (fromToken.name === "WBNB" && toToken.name === "BNB")
          ) {
            dispatch(changeRecieve(e.target.value));
          }
        }}
      />
      <button
        onClick={() => dispatch(changeAmount(balance))}
        className='absolute right-[25px]'
      >
        max
      </button>
    </>
  );
};

export default FromInput;
