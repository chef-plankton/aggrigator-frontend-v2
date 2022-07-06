import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import {
  changeAmount,
  changeRecieve,
} from "../../../features/route/routeSlice";
const StyledInput = styled.input`
  position: relative;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 35px;
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
    font-size: 25px;
  }
  :-ms-input-placeholder {
    font-size: 25px;
  }
`;
function FromInput() {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const dispatch = useDispatch();
  return (
    <StyledInput
      color={themeMode === "light" ? "black" : "white"}
      placeholder='Please enter your coin balance'
      onChange={(e) => {
        dispatch(changeAmount(e.target.value));
        if (
          (fromToken.name === "BNB Native Token" &&
            toToken.name === "Wraped BNB Token") ||
          (fromToken.name === "Wraped BNB Token" &&
            toToken.name === "BNB Native Token")
        ) {
          dispatch(changeRecieve(e.target.value));
        }
      }}
    />
  );
}

export default FromInput;
