import { parseEther } from "@ethersproject/units";
import axios from "axios";
import { BigNumber } from "ethers";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import { RouteDescriptionStruct, SwapDescriptionStruct } from "../../../config/abi/types/AkkaAggrigator";
import { NetworkName, RouteResponseDto, SwapTypes } from "../../../config/constants/types";
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
  const Connectedwallet = useWallet(wallet)
  const { useAccount } = Connectedwallet
  const account = useAccount();

  const dispatch = useDispatch();
  useEffect(() => {
    if (fromToken.adress !== "" && toToken.adress !== "" && amount !== "") {
      axios
        .get(
          `http://192.64.112.22:8084/route?token0=${fromToken.adress}&chain0=${fromChain === 56 ? "bsc" : fromChain === 250 ? "fantom" : ""
          }&token1=${toToken.adress}&chain1=${toChain === 56 ? "bsc" : toChain === 250 ? "fantom" : ""
          }&amount=${amount}`
        )
        .then((data) => {
          dispatch(changeResponseString(JSON.stringify(data)));
          dispatch(changeResponseData(data));
          dispatch(changeShowRoute(true));

          dispatch(changeSwapDescription(JSON.stringify(convertResponseDataToSwapDescriptionStruct(data.data))))

        });
    }
  }, [amount, fromChain, toChain, fromToken, toToken, chainId, counter]);
  const convertResponseDataToSwapDescriptionStruct = (resData: RouteResponseDto) => {
    let swapDescription: SwapDescriptionStruct;
    swapDescription = {
      ...swapDescription,
      srcDesiredAmount: resData.input_amount,
      dstDesiredMinAmount: resData.return_amount,
      dstChainId: 0,
      dstPoolId: 0,

      srcPoolId: 0,
      gasForSwap: BigNumber.from('0'),
      dstContractAddress: process.env.REACT_APP_FTM_AKKA_CONTRACT,
      to: account,
    }

    resData.routes[0].operations_seperated.forEach(({ chain, chain_id, gas_fee, operations }) => {
      swapDescription = {
        ...swapDescription,

      }
      if (chain === 'bridge') {
        swapDescription = {
          ...swapDescription,
          dstChainId: 0,
          dstPoolId: 0,
          srcPoolId: 0,
        }
      }
      switch (chain as NetworkName) {
        case NetworkName.FTM.toLowerCase():
        case NetworkName.BSC.toLowerCase(): {
          operations.forEach(({ amount_in, amount_out, ask_token, contract_addr, exchange, offer_token, router_addr }) => {

            const route0: RouteDescriptionStruct = {
              srcToken: offer_token[0],
              dstToken: ask_token[0],
              srcAmount: parseEther(amount_in.toString()),
              dstMinAmount: parseEther(amount_out.toString()),
              path: [offer_token[0], ask_token[0]],
              router: router_addr,
              swapType: SwapTypes.Regular,
            }
            swapDescription = {
              ...swapDescription,
              srcToken: operations[0].offer_token[0],
              dstToken: operations[operations.length - 1].ask_token[0],
              isRegularTransfer: true,
              srcDesiredAmount: parseEther(amount_in.toString()),
              dstDesiredMinAmount: parseEther(amount_out.toString()),
            }
            if (swapDescription?.routes === undefined) {
              swapDescription = {
                ...swapDescription,
                routes: [route0]
              }
            } else {
              console.log(swapDescription);

              swapDescription = {
                ...swapDescription,
                routes: [...swapDescription.routes, route0]
              }
            }

          })
        }

          break
        default:
          break;
      }

      // if (chain === NetworkName.BSC.toLowerCase()){

      // }

    })
    console.log('fsd');

    return swapDescription
  }
  return (
    <StyledInput
      color={themeMode === "light" ? "black" : "white"}
      placeholder='Enter amount you want to sell'
      onChange={(e) => {
        dispatch(changeAmount(e.target.value));
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
