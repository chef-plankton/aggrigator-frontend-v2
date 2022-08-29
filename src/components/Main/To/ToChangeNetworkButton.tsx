import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import ArrowDownFont from "../../../assets/arrow-down-sign-to-navigate.png";
import { ToNetworklistStatus } from "../../../features/modals/modalsSlice";
const StyledButton = styled.div<{ backgroundColor: string }>`
  width: 50%;
  min-height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  text-decoration: none;
  // background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#EEEEEE"};
  border: 1px solid rgba(255,255,255,0.01);
  border-radius: 5px;
  // backdrop-filter: blur(30px);
  font-size: 12px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;
const ToChangeNetworkButton: FC<{
  imageSrc: string;
  coinName: string;
}> = ({ imageSrc, coinName }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <StyledButton
      className='hover:bg-[#ffffff]/[0.2]'
      backgroundColor={
        themeMode === "light"
          ? "rgba(255, 255, 255, 0.02)"
          : "rgba(255, 255, 255, 0.02)"
      }
      onClick={() => dispatch(ToNetworklistStatus(true))}
    >
      <div className='w-[25%]'>
        <img src={imageSrc} alt='' className='w-[32px]' />
      </div>
      <div className='mx-2 w-[65%] text-left font-outfit font-[500] text-[13px]'>
        <h3>{coinName}</h3>
      </div>
      <div className='w-[10%]'>
        <img src={ArrowDownFont} alt='' className='w-[10px]' />
      </div>
    </StyledButton>
  );
};

export default ToChangeNetworkButton;
