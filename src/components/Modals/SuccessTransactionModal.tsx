import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import CloseIcon from "../../assets/img/close.png";
import { changeModalStatus } from "../../features/modals/modalsSlice";
function SuccessTransactionModal() {
  const successModalState = useSelector(
    ({ modals }: RootState) => modals.SuccessModalState
  );
  const dispatch = useDispatch();

  return (
    <>
      <div className='flex justify-between items-center mb-5 pb-4 border-b-[2px] border-[#ffffff1a] bg-clip-padding'>
        <div>
          <h4 className='font-medium text-[#4FC37E] font-outfit'>Its Done</h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=''
            onClick={() => dispatch(changeModalStatus(false))}
            className='cursor-pointer w-[15px]'
          />
        </div>
      </div>{" "}
      <div className='flex flex-col items-center justify-between my-1'>
        <span className='text-[#4FC37E] my-2 text-center font-outfit'>
          Tx Hash: <span className="break-all font-outfit">{successModalState?.txHash}</span>
        </span>
        <span className='text-white my-2 text-center font-outfit'>
          Transaction has been submitted to the blockchain It may take up to 20
          min to receive funds
        </span>
        <span className='text-[#FBF110] my-2 text-center font-outfit'>
          If the transaction fails at the destination chain you will receive an
          equivalent stable coin on the destination.
        </span>
        <a className='text-white mt-5 py-2 px-3 border-[2px] border-white border-solid cursor-pointer font-outfit'>
          Contact with support
        </a>
      </div>
    </>
  );
}

export default SuccessTransactionModal;
