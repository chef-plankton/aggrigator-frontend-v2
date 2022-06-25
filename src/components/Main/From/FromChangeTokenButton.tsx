import React, { FC, HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import ArrowDownFont from "../../../assets/arrow-down-sign-to-navigate.png";
import tokenImage from "../../../assets/img/token.png";
import { fromTokenlistStatus } from "../../../features/modals/modalsSlice";
const StyledButton = styled.div<HTMLAttributes<HTMLElement> & { backgroundColor: string }>`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  margin: 0 10px;
  text-decoration: none;
  border-radius: 15px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#EEEEEE"};
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  font-size: 14px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;
const FromChangeChainButton: FC<{
  imageSrc: string;
  coinName: string;
  chain: string;
}> = ({ imageSrc, coinName, chain }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  return (
    <StyledButton
      backgroundColor={themeMode === "light" ? "#EEEEEE" : "#393E46"}
      onClick={() => dispatch(fromTokenlistStatus(true))}
    >
      {/* <div>
        <img src={imageSrc} alt="" />
      </div>
      <div className="mx-5">
        <h3>{coinName}</h3>
        <h6>{chain}</h6>
      </div> */}
      <div>
        <img src={tokenImage} alt="" className="w-[42px]" />
      </div>
      <div className="mx-5">
        <h2>Select Token</h2>
      </div>
      <div>
        <img src={ArrowDownFont} alt="" />
      </div>
    </StyledButton>
  );
};

export default FromChangeChainButton;
