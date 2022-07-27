import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import {
  changeAmount,
  changeRecieve,
  changeResponseData,
  changeResponseString,
  changeShowRoute,
} from "../../../features/route/routeSlice";
const StyledInput = styled.input`
  position: relative;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 24px;
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
  const dispatch = useDispatch();
  useEffect(() => {
    if (fromToken.adress !== "" && toToken.adress !== "" && amount !== "") {
      axios
        .get(
          `http://192.64.112.22:8084/route?token0=${fromToken.adress}&chain0=${
            fromChain === 56 ? "bsc" : fromChain === 250 ? "fantom" : ""
          }&token1=${toToken.adress}&chain1=${
            toChain === 56 ? "bsc" : toChain === 250 ? "fantom" : ""
          }&amount=${amount}`
        )
        .then((data) => {          
          dispatch(changeResponseString(JSON.stringify(data)));
          dispatch(changeResponseData(data));
          dispatch(changeShowRoute(true));
        });
    }
  }, [amount, fromChain, toChain, fromToken, toToken, chainId, counter]);

  return (
    <StyledInput
      color={themeMode === "light" ? "black" : "white"}
      placeholder="Please enter your coin balance"
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
