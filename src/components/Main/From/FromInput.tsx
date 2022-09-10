import { parseUnits } from "@ethersproject/units";
import axios from "axios";
import { BigNumber } from "ethers";
import { isNumber } from "lodash";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { RootState } from "../../../app/store";
import {
  RouteDescriptionStruct,
  SwapDescriptionStruct,
} from "../../../config/abi/types/AkkaAggrigator";
import { getPriceOfToken } from "../../../config/api";
import {
  MultiChainSwapDescriptionStruct,
  NetworkName,
  OneChainSwapDescriptionStruct,
  RouteRegularOperations,
  RouteResponseDto,
  RouteStargateBridgeOperations,
  SwapTypes,
} from "../../../config/constants/types";
import {
  changeAmount,
  changeIsLoading,
  changeOneChainSwapDesc,
  changePayloadEncodeSwapDesc,
  changeQuoteLayerZeroFeeSwapDesc,
  changeRecieve,
  changeResponseData,
  changeResponseString,
  changeShowRoute,
  changeSwapDescription,
} from "../../../features/route/routeSlice";
import {
  setContractWithChainId,
  dstSetContractWithChainId,
} from "../../../hooks/useSetContractWithChainId";
import useWallet from "../../Wallets/useWallet";
const StyledInput = styled.input`
  text-align: right;
  text-overflow: ellipsis;
  font-weight: 400;
  padding: 10px;
  display: block;
  color: white;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.01);
  outline: none;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 5px;
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
  return parseUnits(n.toFixed(decimal), decimal);
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
  const oneChainSwapDesc = useSelector(
    ({ route }: RootState) => route.oneChainSwapDesc
  );
  const quoteLayerZeroFeeSwapDesc = useSelector(
    ({ route }: RootState) => route.quoteLayerZeroFeeSwapDesc
  );
  const payloadEncodeSwapDesc = useSelector(
    ({ route }: RootState) => route.payloadEncodeSwapDesc
  );
  const akkaContractAddress = setContractWithChainId(toChain);

  const akkaDstContractAddress = dstSetContractWithChainId(toChain);

  const Connectedwallet = useWallet(wallet);
  const { useAccount, useChainId } = Connectedwallet;
  const account = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {
    if (fromToken.adress !== "" && toToken.adress !== "" && amount !== "") {
      dispatch(changeIsLoading(true));
      if (!isNaN(Number(amount)) && amount !== "0" && Number(amount) !== 0) {
        const getData = setTimeout(() => {
          axios
            .get(
              `https://www.api.akka.finance/route?token0=${
                fromToken.adress
              }&chain0=${
                fromChain === 56 ? "bsc" : fromChain === 250 ? "fantom" : ""
              }&token1=${toToken.adress}&chain1=${
                toChain === 56 ? "bsc" : toChain === 250 ? "fantom" : ""
              }&amount=${amount}`
            )
            .then((data) => {
              if (data.data[0] === -1) {
                Swal.fire({
                  icon: "error",
                  title: "No route found",
                  background: "rgb(23, 22, 41)",
                  position: "center",
                  showCancelButton: false,
                  showConfirmButton: false,
                  width: "400px",
                  timer: 2000,
                });
                return;
              }
              dispatch(changeResponseString(JSON.stringify(data)));
              dispatch(changeResponseData(data.data));
              dispatch(changeShowRoute(true));
              if (fromChain === toChain) {
                dispatch(
                  changeOneChainSwapDesc(
                    JSON.stringify(oneChainSwapDescriptionStruct(data.data))
                  )
                );
                dispatch(changeQuoteLayerZeroFeeSwapDesc(null));
                dispatch(changePayloadEncodeSwapDesc(null));
              } else {
                dispatch(
                  changeQuoteLayerZeroFeeSwapDesc(
                    JSON.stringify(
                      multiChainSwapDescriptionStruct(data.data)
                        .quoteLayerZeroFeeSwapDescriptionStruct
                    )
                  )
                );
                dispatch(
                  changePayloadEncodeSwapDesc(
                    JSON.stringify(
                      multiChainSwapDescriptionStruct(data.data)
                        .payloadEncodeSwapDescription
                    )
                  )
                );
                dispatch(changeOneChainSwapDesc(null));
              }
            })
            .finally(() => {
              dispatch(changeIsLoading(false));
            });
        }, 1000);
        return () => clearTimeout(getData);
      }
    }
  }, [amount, fromChain, toChain, fromToken, toToken, chainId, counter]);
  useEffect(() => {
    if (fromToken.adress !== "" && toToken.adress !== "" && amount !== "") {
      getPriceOfToken("BTC").then(console.log).catch(console.log);
    }
  }, [amount, fromChain, toChain, fromToken, toToken, chainId, counter]);

  // One Chain Swap Object For Smart Contract
  const oneChainSwapDescriptionStruct = (
    resData: RouteResponseDto
  ): SwapDescriptionStruct => {
    let OneChainOpration = resData.routes[0].operations_seperated[0].operations;
    let oneChainSwapDescriptionStruct: SwapDescriptionStruct;
    oneChainSwapDescriptionStruct = {
      srcToken: OneChainOpration[0].offer_token[0],
      dstToken: OneChainOpration[OneChainOpration.length - 1].ask_token[0],
      srcDesiredAmount: BigNumber.from(OneChainOpration[0].amount_in_wei),
      dstDesiredMinAmount: BigNumber.from(
        OneChainOpration[OneChainOpration.length - 1].amount_out_wei
      ),
      to: account,
      dstChainId: 0,
      dstPoolId: 0,
      srcPoolId: 0,
      gasForSwap: BigNumber.from("2105617"),
      dstContractAddress: setContractWithChainId(
        resData.routes[0].operations_seperated[0].chain_id
      ),
      isRegularTransfer: true,
      routes: OneChainOpration.map((route) => {
        return {
          srcToken: route.offer_token[0],
          dstToken: route.ask_token[0],
          srcAmount: BigNumber.from(route.amount_in_wei),
          dstMinAmount: BigNumber.from(route.amount_out_wei),
          swapType: 1,
          protocolType: 1,
          path: [route.offer_token[0], route.ask_token[0]],
          protocolAddresses: [route.router_addr],
        };
      }),
    };
    return oneChainSwapDescriptionStruct;
  };
  // Multi Chain Swap Object For Smart Contract
  const multiChainSwapDescriptionStruct = (resData: RouteResponseDto) => {
    let SrcChainOpration: (
      | RouteRegularOperations
      | RouteStargateBridgeOperations
    )[];
    let BridgeChainOpration: (
      | RouteRegularOperations
      | RouteStargateBridgeOperations
    )[];
    let DstChainOpration: (
      | RouteRegularOperations
      | RouteStargateBridgeOperations
    )[];
    let MixeadSrcAndBridge: (
      | RouteRegularOperations
      | RouteStargateBridgeOperations
    )[];
    let payloadEncodeSwapDescription: SwapDescriptionStruct;
    let quoteLayerZeroFeeSwapDescriptionStruct: SwapDescriptionStruct;
    switch (resData.routes[0].operations_seperated.length) {
      case 1: {
        SrcChainOpration = null;
        BridgeChainOpration =
          resData.routes[0].operations_seperated[0].operations;
        const NewBridgeChainOpration = new RouteStargateBridgeOperations({
          ...resData.routes[0].operations_seperated[1].operations[0],
        });
        DstChainOpration = null;

        // quoteLayerZero Object
        quoteLayerZeroFeeSwapDescriptionStruct = {
          srcToken: BridgeChainOpration[0].offer_token[0],
          dstToken:
            BridgeChainOpration[BridgeChainOpration.length - 1].ask_token[0],
          srcDesiredAmount: BigNumber.from(
            BridgeChainOpration[0].amount_in_wei
          ),
          dstDesiredMinAmount: BigNumber.from(
            BridgeChainOpration[BridgeChainOpration.length - 1].amount_out_wei
          ),
          to: account,
          dstChainId: NewBridgeChainOpration.ask_bridge_data.chain_id,
          dstPoolId: NewBridgeChainOpration.ask_bridge_data.pool_id,
          srcPoolId: NewBridgeChainOpration.offer_bridge_data.pool_id,
          gasForSwap: BigNumber.from("1005617"),
          dstContractAddress: account,
          isRegularTransfer: false,
          routes: BridgeChainOpration.map((route, index) => {
            return {
              srcToken: route.offer_token[0],
              dstToken: route.ask_token[0],
              srcAmount: BigNumber.from(route.amount_in_wei),
              dstMinAmount: BigNumber.from(route.amount_out_wei),
              swapType: index === BridgeChainOpration.length - 1 ? 2 : 1,
              protocolType: 1,
              path: [route.offer_token[0], route.ask_token[0]],
              protocolAddresses: [route.router_addr],
            };
          }),
        };
        return { quoteLayerZeroFeeSwapDescriptionStruct };
      }
      case 2:
        {
          if (
            resData.routes[0].operations_seperated[0].chain ===
            NetworkName.BRIDGE
          ) {
            SrcChainOpration = null;
            const NewBridgeChainOpration = new RouteStargateBridgeOperations({
              ...resData.routes[0].operations_seperated[1].operations[0],
            });
            BridgeChainOpration =
              resData.routes[0].operations_seperated[0].operations;
            DstChainOpration =
              resData.routes[0].operations_seperated[1].operations;
            // quoteLayerZero Object
            quoteLayerZeroFeeSwapDescriptionStruct = {
              srcToken: BridgeChainOpration[0].offer_token[0],
              dstToken:
                BridgeChainOpration[BridgeChainOpration.length - 1]
                  .ask_token[0],
              srcDesiredAmount: BigNumber.from(
                BridgeChainOpration[0].amount_in_wei
              ),
              // dstDesiredMinAmount: BigNumber.from(
              //   BridgeChainOpration[BridgeChainOpration.length - 1]
              //     .amount_out_wei
              // ),
              dstDesiredMinAmount: BigNumber.from(
                BridgeChainOpration[0].amount_in_wei
              ),
              to: account,
              dstChainId: NewBridgeChainOpration.ask_bridge_data.chain_id,
              dstPoolId: NewBridgeChainOpration.ask_bridge_data.pool_id,
              srcPoolId: NewBridgeChainOpration.offer_bridge_data.pool_id,
              gasForSwap: BigNumber.from("1005617"),
              dstContractAddress: dstSetContractWithChainId(toChain),
              isRegularTransfer: false,
              routes: BridgeChainOpration.map((route, index) => {
                return {
                  srcToken: route.offer_token[0],
                  dstToken: route.ask_token[0],
                  srcAmount: BigNumber.from(route.amount_in_wei),
                  dstMinAmount: BigNumber.from(route.amount_out_wei),
                  swapType: index === BridgeChainOpration.length - 1 ? 2 : 1,
                  protocolType: 1,
                  path: [route.offer_token[0], route.ask_token[0]],
                  protocolAddresses: [route.router_addr],
                };
              }),
            };
            // playload Object
            payloadEncodeSwapDescription = {
              srcToken: DstChainOpration[0].offer_token[0],
              dstToken:
                DstChainOpration[DstChainOpration.length - 1].ask_token[0],
              srcDesiredAmount: BigNumber.from(
                DstChainOpration[0].amount_in_wei
              ),
              dstDesiredMinAmount: BigNumber.from(
                DstChainOpration[DstChainOpration.length - 1].amount_out_wei
              ),
              to: account,
              dstChainId: 0,
              dstPoolId: 0,
              srcPoolId: 0,
              gasForSwap: BigNumber.from("1005617"),
              dstContractAddress: account,
              isRegularTransfer: false,
              routes: DstChainOpration.map((route) => {
                return {
                  srcToken: route.offer_token[0],
                  dstToken: route.ask_token[0],
                  srcAmount: BigNumber.from(route.amount_in_wei),
                  dstMinAmount: BigNumber.from(route.amount_out_wei),
                  swapType: 1,
                  protocolType: 1,
                  path: [route.offer_token[0], route.ask_token[0]],
                  protocolAddresses: [route.router_addr],
                };
              }),
            };
            return {
              payloadEncodeSwapDescription,
              quoteLayerZeroFeeSwapDescriptionStruct,
            };
          }
          if (
            resData.routes[0].operations_seperated[1].chain ===
            NetworkName.BRIDGE
          ) {
            SrcChainOpration =
              resData.routes[0].operations_seperated[0].operations;
            const NewBridgeChainOpration = new RouteStargateBridgeOperations({
              ...resData.routes[0].operations_seperated[1].operations[0],
            });
            BridgeChainOpration =
              resData.routes[0].operations_seperated[1].operations;
            MixeadSrcAndBridge = SrcChainOpration.concat(BridgeChainOpration);
            DstChainOpration = null;
            // quoteLayerZero Object
            quoteLayerZeroFeeSwapDescriptionStruct = {
              srcToken: MixeadSrcAndBridge[0].offer_token[0],
              dstToken:
                MixeadSrcAndBridge[MixeadSrcAndBridge.length - 1].ask_token[0],
              srcDesiredAmount: BigNumber.from(
                MixeadSrcAndBridge[0].amount_in_wei
              ),
              // dstDesiredMinAmount: BigNumber.from(
              //   MixeadSrcAndBridge[MixeadSrcAndBridge.length - 1].amount_out_wei
              // ),
              dstDesiredMinAmount: BigNumber.from(
                BridgeChainOpration[0].amount_in_wei
              ),
              to: account,
              dstChainId: NewBridgeChainOpration.ask_bridge_data.chain_id,
              dstPoolId: NewBridgeChainOpration.ask_bridge_data.pool_id,
              srcPoolId: NewBridgeChainOpration.offer_bridge_data.pool_id,
              gasForSwap: BigNumber.from("1005617"),
              dstContractAddress: account,
              isRegularTransfer: false,
              routes: MixeadSrcAndBridge.map((route, index) => {
                return {
                  srcToken: route.offer_token[0],
                  dstToken: route.ask_token[0],
                  srcAmount: BigNumber.from(route.amount_in_wei),
                  dstMinAmount: BigNumber.from(route.amount_out_wei),
                  swapType: index === MixeadSrcAndBridge.length - 1 ? 2 : 1,
                  protocolType: 1,
                  path: [route.offer_token[0], route.ask_token[0]],
                  protocolAddresses: [route.router_addr],
                };
              }),
            };
            return { quoteLayerZeroFeeSwapDescriptionStruct };
          }
        }
        break;
      case 3: {
        SrcChainOpration = resData.routes[0].operations_seperated[0].operations;
        const NewBridgeChainOpration = new RouteStargateBridgeOperations({
          ...resData.routes[0].operations_seperated[1].operations[0],
        });
        BridgeChainOpration =
          resData.routes[0].operations_seperated[1].operations;
        MixeadSrcAndBridge = SrcChainOpration.concat(BridgeChainOpration);
        DstChainOpration = resData.routes[0].operations_seperated[2].operations;
        // quoteLayerZero Object
        quoteLayerZeroFeeSwapDescriptionStruct = {
          srcToken: MixeadSrcAndBridge[0].offer_token[0],
          dstToken:
            MixeadSrcAndBridge[MixeadSrcAndBridge.length - 1].ask_token[0],
          srcDesiredAmount: BigNumber.from(MixeadSrcAndBridge[0].amount_in_wei),
          dstDesiredMinAmount: BigNumber.from(0),
          to: account,
          dstChainId: NewBridgeChainOpration.ask_bridge_data.chain_id,
          dstPoolId: NewBridgeChainOpration.ask_bridge_data.pool_id,
          srcPoolId: NewBridgeChainOpration.offer_bridge_data.pool_id,
          gasForSwap: BigNumber.from("600000"),
          dstContractAddress: dstSetContractWithChainId(toChain),
          isRegularTransfer: false,
          routes: MixeadSrcAndBridge.map((route, index) => {
            return {
              srcToken: route.offer_token[0],
              dstToken: route.ask_token[0],
              srcAmount: BigNumber.from(route.amount_in_wei),
              dstMinAmount: BigNumber.from(route.amount_out_wei),
              swapType: index === MixeadSrcAndBridge.length - 1 ? 2 : 1,
              protocolType: 1,
              path: [route.offer_token[0], route.ask_token[0]],
              protocolAddresses: [route.router_addr],
            };
          }),
        };
        // playload Object
        payloadEncodeSwapDescription = {
          srcToken: DstChainOpration[0].offer_token[0],
          dstToken: DstChainOpration[DstChainOpration.length - 1].ask_token[0],
          srcDesiredAmount: BigNumber.from(DstChainOpration[0].amount_in_wei),
          dstDesiredMinAmount: BigNumber.from(
            DstChainOpration[DstChainOpration.length - 1].amount_out_wei
          ),
          to: account,
          dstChainId: 0,
          dstPoolId: 0,
          srcPoolId: 0,
          gasForSwap: BigNumber.from("1005617"),
          dstContractAddress: setContractWithChainId(
            resData.routes[0].operations_seperated[2].chain_id
          ),
          isRegularTransfer: false,
          routes: DstChainOpration.map((route) => {
            return {
              srcToken: route.offer_token[0],
              dstToken: route.ask_token[0],
              srcAmount: BigNumber.from(route.amount_in_wei),
              dstMinAmount: BigNumber.from(route.amount_out_wei),
              swapType: 1,
              protocolType: 1,
              path: [route.offer_token[0], route.ask_token[0]],
              protocolAddresses: [route.router_addr],
            };
          }),
        };
        return {
          payloadEncodeSwapDescription,
          quoteLayerZeroFeeSwapDescriptionStruct,
        };
      }
      default:
        console.log("error in creating smart contract struct");
    }
  };

  const convertResponseDataToSwapDescriptionStruct = (
    resData: RouteResponseDto
  ) => {
    let swapDescription: SwapDescriptionStruct;
    swapDescription = {
      ...swapDescription,
      dstChainId: 0,
      dstPoolId: 0,
      srcPoolId: 0,
      gasForSwap: BigNumber.from("505617"),
      dstContractAddress: akkaDstContractAddress,
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
                    protocolAddresses: [router_addr],
                    protocolType: 1,
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
                    amount_out_wei,
                  } = routeStargateBridgeOperations;
                  let route0: RouteDescriptionStruct;

                  route0 = {
                    srcToken: offer_token[0],
                    dstToken: ask_token[0],
                    srcAmount: test(amount_in, +offer_token[4]),
                    dstMinAmount: BigNumber.from(amount_out_wei),
                    path: [offer_token[0], ask_token[0]],
                    protocolAddresses: [router_addr],
                    protocolType: 1,
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
      }
    );
    swapDescription = { ...swapDescription, isRegularTransfer: true };
    swapDescription?.routes.forEach((s, index, arr) => {
      if (index === 0) {
        const operations = resData.routes[0].operations;

        // parseUnits(
        //   resData.return_amount.toString(),
        //   +operations[operations.length - 1].ask_token[4]
        // )
        swapDescription = {
          ...swapDescription,
          srcToken: arr[0].srcToken,
          dstToken: arr[arr.length - 1].dstToken,
          srcDesiredAmount: parseUnits(
            resData.input_amount.toString(),
            +operations[0].offer_token[4]
          ),
          dstDesiredMinAmount: parseUnits(
            resData.return_amount_wei,
            +operations[operations.length - 1].ask_token[4]
          ),
        };
      }

      if (s.swapType === SwapTypes.StargateBridge) {
        if (arr[index + 1] !== undefined) {
          swapDescription = { ...swapDescription, isRegularTransfer: false };
        }
      }
    });

    return swapDescription;
  };
  useEffect(() => {
    console.log({ oneChainSwapDesc });
    console.log({ quoteLayerZeroFeeSwapDesc });
    console.log({ payloadEncodeSwapDesc });
  }, [oneChainSwapDesc, quoteLayerZeroFeeSwapDesc, payloadEncodeSwapDesc]);

  return (
    <>
      <StyledInput
        className='font-outfit font-[500] text-[14px] hover:border-[#ffffff]/[0.2] focus:border-[#D6C1FC]'
        color={themeMode === "light" ? "white" : "white"}
        placeholder='Sell amount'
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
    </>
  );
};

export default FromInput;
