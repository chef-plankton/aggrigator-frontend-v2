import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CloseIcon from "../../../assets/img/close.png";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import ToToken from "./ToToken";
const StyledInput = styled.input<HTMLAttributes<HTMLInputElement>>`
  width: 100%;
  height: 100%;
  padding: 15px 15px;
  margin-bottom: 30px;
  margin-top: 10px;
  text-decoration: none;
  border-radius: 15px;
  background-color: #eeeeee;
  border: 1px solid #1378a6;
  backdrop-filter: blur(30px);
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;
function ToTokenlist() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-between items-center mb-5 pt-5 pr-5 pl-5">
        <div>
          <h4 className="font-medium">Select a token</h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=""
            onClick={() => dispatch(changeModalStatus(false))}
            className="cursor-pointer w-[15px]"
          />
        </div>
      </div>
      <div className="px-5">
        <StyledInput type="text" placeholder="Search name or paste address" />
      </div>
      <div className="flex flex-col w-[100%] overflow-y-scroll px-5">
        <ToToken />
        <ToToken />
        <ToToken />
        <ToToken />
      </div>
      <div className="w-[100%] border-[1px] rounded-xl px-[12px] py-[15px] bg-[#edeef2] mt-2 cursor-pointer">
        <p className="text-[14px] text-center">Manage Tokenlist</p>
      </div>
    </>
  );
}

export default ToTokenlist;
