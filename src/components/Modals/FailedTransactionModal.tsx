import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import CloseIcon from "../../assets/img/close.png";
import { changeModalStatus } from "../../features/modals/modalsSlice";
function FailedTransactionModal() {
  const failedModalState = useSelector(
    ({ modals }: RootState) => modals.FailedModalState
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className='flex justify-between items-center mb-5 pb-4 border-b-[2px] border-[rgb(255, 255, 255, 0.1)] bg-clip-padding'>
        <div>
          <h4 className='font-medium text-[#DB4D4D] font-outfit'>Oops!</h4>
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
        <span className='text-[#DB4D4D] my-2 text-center font-outfit'>
          Tx Hash:{" "}
          <span className='break-all font-outfit'>{failedModalState?.txHash}</span>
        </span>
        <span className='text-white my-2 text-center font-outfit'>
          The transaction has been failed, Please try again.
        </span>
        <a className='text-white mt-5 py-2 px-3 border-[2px] border-white border-solid cursor-pointer font-outfit'>
          Contact with support
        </a>
      </div>
    </>
  );
}

export default FailedTransactionModal;
