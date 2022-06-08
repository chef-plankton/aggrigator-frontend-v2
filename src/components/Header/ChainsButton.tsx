import React, { FC } from "react";

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
  return (
    <button
      onClick={toggleChains}
      className="py-2 px-2 font-medium text-gray-500 rounded transition duration-300 flex items-center chainslistbtn"
    >
      <img
        src="https://app.1inch.io/assets/images/network-logos/ethereum.svg"
        alt=""
        className="w-5 mr-1"
      />
      Ethereum
      <img
        src={ArrowDownFont}
        alt=""
        className="w-[12px] h-[12px] ml-1 -mb-0.5"
      />
    </button>
  );
};

export default ChainsButton;
