import React, { FC, HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import ArrowDownFont from "../../../assets/arrow-down-sign-to-navigate.png";
import tokenImage from "../../../assets/img/creation.png";
import { fromTokenlistStatus } from "../../../features/modals/modalsSlice";
const StyledButton = styled.div<
  HTMLAttributes<HTMLElement> & { backgroundColor: string }
>`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  margin: 0 10px;
  text-decoration: none;
  border-radius: 15px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#EEEEEE"};
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  font-size: 12px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;
const FromChangeChainButton: FC<{
  imageSrc: string;
  coinName: string;
  chain: string;
}> = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  return (
    <StyledButton
      backgroundColor={themeMode === "light" ? "#EEEEEE" : "#393E46"}
      onClick={() => dispatch(fromTokenlistStatus(true))}
    >
      <div className="w-[20%]">
        <img
          src={
            fromToken.adress
              ? `https://assets-cdn.trustwallet.com/blockchains/${
                  fromChain === 56 || fromChain === 97
                    ? "smartchain"
                    : fromChain === 250
                    ? "fantom"
                    : ""
                }/assets/${fromToken.adress}/logo.png`
              : tokenImage
          }
          alt=""
          className="w-[32px]"
        />
      </div>
      <div className="mx-5 w-[60%] text-center">
        <h2>{fromToken.symbol === "" ? "Select Token" : fromToken.symbol}</h2>
      </div>
      <div className="w-[20%]">
        <img src={ArrowDownFont} alt="" className="w-[10px]" />
      </div>
    </StyledButton>
  );
};

export default FromChangeChainButton;
