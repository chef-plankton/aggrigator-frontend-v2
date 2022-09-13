import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import ReceiverInput from "./ReceiverInput";
const StyledReceiverBox = styled.div<{
  color: string;
  backgroundColor: string;
}>`
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "rgba(255, 255, 255, 0.25)"};
  box-shadow: 0 8px 32px 0 #23293176;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  min-height: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ color }) => (color ? color : "black")};
`;
function ReceiverBox() {
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <StyledReceiverBox
      color={themeMode === "light" ? "black" : "white"}
      backgroundColor={
        themeMode === "light"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(255, 255, 255, 0.25)"
      }
    >
      <div className="px-3 py-5 flex justify-between flex-col md:flex-row">
        <div className="md:w-[100%] w-[100%} mt-[50px] md:mt-0 flex justify-center">
          <ReceiverInput />
        </div>
      </div>
    </StyledReceiverBox>
  );
}

export default ReceiverBox;
