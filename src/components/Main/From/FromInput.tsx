import { formatUnits, parseEther, parseUnits } from "@ethersproject/units";
import axios from "axios";
import { BigNumber } from "ethers";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import {
  RouteDescriptionStruct,
  SwapDescriptionStruct,
} from "../../../config/abi/types/AkkaAggrigator";
import {
  NetworkName,
  RouteRegularOperations,
  RouteStargateBridgeOperations,
  RouteResponseDto,
  SwapTypes,
  BridgeName,
  RouteOperationsSeparated,
} from "../../../config/constants/types";
import {
  changeAmount,
  changeRecieve,
  changeResponseData,
  changeResponseString,
  changeShowRoute,
  changeSwapDescription,
} from "../../../features/route/routeSlice";
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
function FromInput() {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const amount = useSelector(({ route }: RootState) => route.amount);
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const counter = useSelector(({ route }: RootState) => route.counter);
  const wallet = useSelector(({ account }: RootState) => account.wallet);
  const Connectedwallet = useWallet(wallet);
  const { useAccount, useChainId } = Connectedwallet;
  const account = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {
    if (fromToken.adress !== "" && toToken.adress !== "" && amount !== "") {
      axios
        .get(
          `https://192.64.112.22:8084/route?token0=${fromToken.adress}&chain0=${
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
        });
    }
  }, [amount, fromChain, toChain, fromToken, toToken, chainId, counter]);
  const convertResponseDataToSwapDescriptionStruct = (
    resData: RouteResponseDto
  ) => {
    let swapDescription: SwapDescriptionStruct;
    let swapDescription2: SwapDescriptionStruct;
    swapDescription = {
      ...swapDescription,
      srcDesiredAmount: parseEther(resData.input_amount.toString()),
      dstDesiredMinAmount: parseEther(resData.return_amount.toString()),
      dstChainId: fromChain !== toChain ? 0 : 0,
      dstPoolId: 0,
      srcPoolId: 0,
      // gasForSwap: BigNumber.from("2705617"),
      gasForSwap: BigNumber.from("1705617"),
      dstContractAddress: process.env.REACT_APP_FTM_AKKA_CONTRACT,
      to: account,
    };
    const hasBridge =
      resData.routes[0].operations_seperated.filter(
        ({ chain }: RouteOperationsSeparated) => chain === BridgeName.Stargate
      ).length === 1;
    // resData.routes[0].operations_seperated.length===3
    resData.routes[0].operations_seperated.forEach(
      ({ chain, chain_id, gas_fee, operations }) => {
        swapDescription = {
          ...swapDescription,
        };
        // if (chain === "bridge") {
        //   swapDescription = {
        //     ...swapDescription,
        //     dstChainId: 0,
        //     dstPoolId: 0,
        //     srcPoolId: 0,
        //   };
        // }
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
                    srcAmount: parseEther(amount_in.toString()),
                    dstMinAmount: parseEther(amount_out.toString()),
                    path: [offer_token[0], ask_token[0]],
                    router: router_addr,
                    swapType: SwapTypes.Regular,
                  };
                  swapDescription = {
                    ...swapDescription,
                    // gasForSwap: parseEther(gas_fee.toString())
                    // srcToken: operations[0].offer_token[0],
                    // dstToken: operations[operations.length - 1].ask_token[0],
                    // isRegularTransfer: true,
                  };
                }
                console.log("amm", { route0 });

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
                  let route1: RouteDescriptionStruct;
                  console.log("asdasml,dsakl",parseUnits(amount_in.toString(),18).toString());
                  console.log("asdasml,dsakl",parseUnits('0.09',6).toString());
                  
                  route0 = {
                    srcToken: offer_token[0],
                    dstToken: ask_token[0],
                    srcAmount: parseEther(amount_in.toString()),
                    dstMinAmount: parseUnits(amount_out.toString(),6),
                    path: [offer_token[0], ask_token[0]],
                    router: router_addr,
                    swapType: SwapTypes.StargateBridge,
                  };
                  route1 = {
                    srcToken: offer_token[0],
                    dstToken: ask_token[0],
                    srcAmount: parseEther(amount_in.toString()),
                    dstMinAmount: parseUnits(amount_out.toString(),6),
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

                  console.log("stargate", { route0 });
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
        swapDescription = {
          ...swapDescription,
          srcToken: arr[0].srcToken,
          dstToken: arr[arr.length - 1].dstToken,
        };
      }
    });
    console.log({ swapDescription });

    return swapDescription;
  };
  return (
    <StyledInput
      color={themeMode === "light" ? "black" : "white"}
      placeholder='Enter amount you want to sell'
      value={amount}
      onChange={(e) => {
        const value = e.target.value;
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
  );
}

export default FromInput;
