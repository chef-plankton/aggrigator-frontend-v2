import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
const StyledInput = styled.input`
  position: relative;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 20px;
  padding: 15px 0px;
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
function ReceiverInput() {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return <StyledInput color={themeMode === "light" ? "black" : "white"} placeholder="Destination wallet address" />;
}

export default ReceiverInput;
