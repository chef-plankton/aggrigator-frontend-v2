import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
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
function ToInput() {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const recieve = useSelector(({ route }: RootState) => route.recieve);
  const responseData = useSelector(
    ({ route }: RootState) => route.responseData
  );
  return (
    <StyledInput
      color={themeMode === "light" ? "black" : "white"}
      placeholder='You will recieve'
      value={responseData.data.return_amount}
      disabled
    />
  );
}

export default ToInput;
