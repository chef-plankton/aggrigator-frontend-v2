import React, { FC } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { RootState } from "../../app/store";
const ChainsButton: FC<{
  ArrowDownFont: string;
  setDropdown: (value: boolean) => void;
  dropdown: boolean;
  setToggle: (value: boolean) => void;
}> = ({ ArrowDownFont, setDropdown, dropdown, setToggle }) => {
  const toggleChains = () => {
    setDropdown(!dropdown);
    setToggle(true);
  };
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  return (
    <>
      <button
        data-tip
        data-for='chainsbutton'
        onClick={toggleChains}
        className='py-2 px-2 font-medium text-gray-500 rounded transition duration-300 flex items-center chainslistbtn'
      >
        <img
          src={`${
            chainId === 1
              ? "https://app.1inch.io/assets/images/network-logos/ethereum.svg"
              : ""
          }${
            chainId === 56
              ? "https://app.1inch.io/assets/images/network-logos/binance-light_2.svg"
              : ""
          }${
            chainId === 137
              ? "https://app.1inch.io/assets/images/network-logos/polygon.svg"
              : ""
          }`}
          alt=''
          className='w-5 mr-1'
        />
        {chainId === 1 ? "Ethereum" : ""}
        {chainId === 56 ? "BNB Chain" : ""}
        {chainId === 137 ? "Polygon" : ""}
        <img
          src={ArrowDownFont}
          alt=''
          className='w-[12px] h-[12px] ml-1 -mb-0.5'
        />
      </button>
      <ReactTooltip id='chainsbutton' type='info' effect='solid' place='bottom'>
        <span>Select your network</span>
      </ReactTooltip>
    </>
  );
};

export default ChainsButton;
