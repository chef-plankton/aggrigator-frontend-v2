import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
const StyledInput = styled.input`
  position: relative;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 20px;
  padding: 10px;
  display: block;
  color: white;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #2f2e3c;
  outline: none;
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
function ToInput() {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const recieve = useSelector(({ route }: RootState) => route.recieve);
  const responseData = useSelector(
    ({ route }: RootState) => route.responseData
  );
  return (
    <StyledInput
      className='font-outfit font-[500] text-[20px]'
      color={themeMode === "light" ? "black" : "white"}
      placeholder='Recieve amount'
      value={
        responseData.data.return_amount
          ? Math.round(responseData.data.return_amount * 100000) / 100000
          : ""
      }
      disabled
    />
  );
}

export default ToInput;
