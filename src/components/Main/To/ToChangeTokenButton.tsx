import React, { FC, HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import ArrowDownFont from "../../../assets/arrow-down-sign-to-navigate.png";
import { ToTokenlistStatus } from "../../../features/modals/modalsSlice";
import tokenImage from "../../../assets/img/creation.png";
const StyledButton = styled.div<
  HTMLAttributes<HTMLElement> & { backgroundColor: string }
>`
  width: 50%;
  min-height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0 10px;
  text-decoration: none;
  // background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#EEEEEE"};
  border: 1px solid rgba(255,255,255,0.01);
  border-radius: 5px;
  // backdrop-filter: blur(30px);
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  @media (max-width: 768px) {
    padding: 10px 15px;
    margin: 0;
    margin-left: 5px;
  }
`;
const ToChangeChainButton: FC<{
  imageSrc: string;
  coinName: string;
  chain: string;
}> = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  return (
    <StyledButton
      className='hover:bg-[#ffffff]/[0.2]'
      backgroundColor={
        themeMode === "light"
          ? "rgba(255, 255, 255, 0.02)"
          : "rgba(255, 255, 255, 0.02)"
      }
      onClick={() => dispatch(ToTokenlistStatus(true))}
    >
      <div className='w-[25%]'>
        <img
          src={
            toToken.adress
              ? `https://assets-cdn.trustwallet.com/blockchains/${
                  toChain === 56 || toChain === 97
                    ? "smartchain"
                    : toChain === 250
                    ? "fantom"
                    : ""
                }/assets/${toToken.adress}/logo.png`
              : tokenImage
          }
          alt=''
          className='w-[32px] rounded-[50%]'
        />
      </div>
      <div className='mx-2 w-[65%] text-left font-outfit font-[500] text-[13px]'>
        <h2>{toToken.symbol === "" ? "Select Token" : toToken.symbol}</h2>
      </div>
      <div className='w-[10%]'>
        <img src={ArrowDownFont} alt='' className='w-[10px]' />
      </div>
    </StyledButton>
  );
};

export default ToChangeChainButton;
