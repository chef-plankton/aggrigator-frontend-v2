import axios from "axios";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import CloseIcon from "../../../assets/img/close.png";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import FromToken from "./FromToken";
import FromTokenlistIsLoading from "./FromTokenlistIsLoading";
const StyledInput = styled.input<HTMLAttributes<HTMLInputElement>>`
  width: 100%;
  height: 100%;
  padding: 15px 15px;
  margin-bottom: 30px;
  margin-top: 10px;
  text-decoration: none;
  border-radius: 10px;
  background-color: #f7f7f7;
  border: 1px solid #1378a6;
  backdrop-filter: blur(30px);
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;
function FromTokenlist() {
  const dispatch = useDispatch();
  const chainId = useSelector(({ chains }: RootState) => chains.value);

  const { isLoading, data, refetch } = useQuery("tokens", () => {
    if (chainId === 56) {
      return axios.get("http://localhost:4000/BSC");
    }
    if (chainId === 137) {
      return axios.get("http://localhost:4000/polygon");
    }
  });
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

      {/* Tokens list search box */}
      <div className="px-5">
        <StyledInput type="text" placeholder="Search name or paste address" />
      </div>

      {/* Tokens list box */}
      <div className="flex flex-col w-[100%] overflow-y-scroll h-[500px] scrollbar">
        {isLoading ? (
          // is Loading Component
          <FromTokenlistIsLoading />
        ) : (
          data.data.map((token, index) => (
            <FromToken token={token} index={index} />
          ))
        )}
      </div>

      {/* Manage Token list */}
      <div className="w-[100%] border-[1px] rounded-xl rounded-t-none px-[12px] py-[15px] bg-[#edeef2] mt-2 cursor-pointer">
        <p className="text-[14px] text-center">Manage Tokenlist</p>
      </div>
    </>
  );
}

export default FromTokenlist;
