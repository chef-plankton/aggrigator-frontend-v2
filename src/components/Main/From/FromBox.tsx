import { formatEther, formatUnits, parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import _ from "lodash";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import fantomIcon from "../../../assets/img/chains/fantom.svg";
import { changeAmount } from "../../../features/route/routeSlice";
import FromAdvanceSettingButton from "./FromAdvanceSettingButton";
import FromChangeNetworkButton from "./FromChangeNetworkButton";
import FromChangeTokenButton from "./FromChangeTokenButton";
import FromInput from "./FromInput";
import FromRefresh from "./FromRefresh";

// From Box Styles
const StyledFromBox = styled.div<{ color: string; backgroundColor: string }>`
  background: transparent;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 5px;
  width: 100%;
  padding: 0 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ color }) => (color ? color : "black")};
`;
interface FromBoxProps {
  account: string;
  balance: BigNumber;
}
// From Box Component
const FromBox: FC<FromBoxProps> = ({ account, balance }) => {
  // Get data from reduxل
  const chainId = useSelector(({ route }: RootState) => route.fromChain);
  const themeMode = useSelector(({ theme }: RootState) => theme.value);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const dispatch = useDispatch();

  return (
    <StyledFromBox
      color={themeMode === "light" ? "white" : "white"}
      backgroundColor={themeMode === "light" ? "transparent" : "transparent"}
    >
      {/* box top bar */}
      <div className='py-1 pb-[10px] w-[100%] flex justify-between font-clash font-[400] text-[15px] items-center h-[32px]'>
        From
        <div className='flex items-center'>
          <span className='px-3 py-1 mx-1 rounded-[5px] bg-[#1B1A2E] text-[#9996B3] font-outfit'>
            Balance:{" "}
            {balance
              ? Number(formatUnits(balance, fromToken.decimals)).toFixed(4)
              : 0}
          </span>
          <button
            onClick={() =>
              dispatch(
                changeAmount(
                  balance
                    ? (
                        Number(formatUnits(balance, fromToken.decimals)) *
                        0.9999
                      ).toFixed(4)
                    : 0
                )
              )
            }
            className='font-outfit font-[500] text-[16px] border-0 border-b-[2px] border-solid border-[#1b1a2e] hover:border-b-[2px] hover:border-[#6100FF] hover:border-solid	'
          >
            Max
          </button>
        </div>
      </div>
      {/* box datas */}
      <div className='flex justify-between flex-col md:flex-row p-[5px] rounded-[5px] bg-[#ffffff]/[0.07]'>
        <div className='md:w-[65%] w-[100%] flex justify-between'>
          {/* from network */}
          <FromChangeNetworkButton
            imageSrc={`${chainId === 56 ? bnblightIcon : ""}${
              chainId === 250 ? fantomIcon : ""
            }${chainId === 97 ? bnblightIcon : ""}`}
            coinName={`
            ${chainId === 56 ? "BNB Chain" : ""}
            ${chainId === 250 ? "Fantom" : ""}${
              chainId === 97 ? "BNB Chain" : ""
            }`}
          />
          {/* from token */}
          <FromChangeTokenButton
            imageSrc={
              "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
            }
            coinName={"Ethereum"}
            chain={"mainnet"}
          />
        </div>
        {/* from input */}
        <div className='md:w-[35%] w-[100%] mt-[5px] md:mt-0 flex justify-end'>
          <FromInput
            balance={
              balance
                ? Number(formatUnits(balance, fromToken.decimals)).toFixed(4)
                : 0
            }
          />
        </div>
      </div>
    </StyledFromBox>
  );
};

export default FromBox;
