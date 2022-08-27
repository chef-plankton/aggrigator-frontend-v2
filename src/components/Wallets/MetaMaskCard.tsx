import { FC, MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { hooks, metaMask } from "../../connectors/metaMask";
import metaMaskIcon from "../../assets/img/wallets/metamask.png";
import { useDispatch } from "react-redux";

const MetaMaskCard: FC<{
  handleClick: (e: MouseEvent<HTMLElement>) => void;
}> = ({ handleClick }) => {
  const { useIsActivating, useIsActive } = hooks;
  const chainId = useSelector(({ chains }: RootState) => chains.value);
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const [error, setError] = useState(undefined);

  return (
    <div
      className='flex flex-col items-center justify-between px-[12px] py-[15px] border-[5px] border-[#22223D] bg-[#22223D] mb-2 cursor-pointer hover:border-[5px] hover:border-[#814AFB]'
      onClick={handleClick}
    >
      <div>
        <img src={metaMaskIcon} alt='' className='w-[32px] mb-2' />
      </div>
      <h6 className='font-medium text-[16px] text-white'>MetaMask</h6>
    </div>
  );
};

export default MetaMaskCard;
