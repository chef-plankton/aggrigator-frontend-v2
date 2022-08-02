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
import { v4 as uuidv4 } from "uuid";
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

  const [tokens, setTokens] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orgListItems, setOrgListItems] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);

  // const { isLoading, data } = useQuery("tokens", () => {
  //   if (chainId === 56) {
  //     return axios.get("http://192.64.112.22:8084/tokens?chain=bsc");
  //   }
  //   if (chainId === 250) {
  //     return axios.get("http://192.64.112.22:8084/tokens?chain=fantom");
  //   }
  //   if (chainId === 97) {
  //     return axios.get("http://localhost:4000/BSC-testnet");
  //   }
  // });

  useEffect(() => {
    // Initial setup
    let url = "";

    if (chainId === 56) {
      url = "http://192.64.112.22:8084/tokens?chain=bsc&limit=100";
    }
    if (chainId === 250) {
      url = "http://192.64.112.22:8084/tokens?chain=fantom&limit=100";
    }
    if (chainId === 97) {
      url = "http://localhost:4000/BSC-testnet";
    }

    axios.get(url).then((res) => {
      setOrgListItems(res.data);
      setTokens(res.data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [tokens]);

  const handleScroll = (e) => {
    let myDiv = e.target;
    if (myDiv.offsetHeight + myDiv.scrollTop < myDiv.scrollHeight || isFetching)
      return;
    setIsFetching(true);
  };

  const fetchData = async () => {
    if (orgListItems.length == 0) return;
    const data1 = orgListItems.slice(page * 10, (page + 1) * 10);
    if (page == 0) {
      setListItems(data1);
    } else {
      setListItems([...listItems, ...data1]);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  useEffect(() => {
    if (searchQuery.slice(0, 2) == "0x") {
      setOrgListItems(
        tokens.filter(
          (c) =>
            c.contract_addr.toLowerCase().indexOf(searchQuery.toLowerCase()) !=
            -1
        )
      );
      setPage(0);
      setIsFetching(true);
    } else {
      setOrgListItems(
        tokens.filter(
          (c) => c.symbol.toLowerCase().indexOf(searchQuery.toLowerCase()) != -1
        )
      );
      setPage(0);
      setIsFetching(true);
    }
  }, [searchQuery]);

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
        <StyledInput
          type="text"
          placeholder="Search name or paste address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tokens list box */}
      <div
        className="flex flex-col w-[100%] overflow-y-scroll h-[500px] scrollbar"
        onScroll={handleScroll}
      >
        {tokens.length == 0 ? (
          // is Loading Component
          <FromTokenlistIsLoading />
        ) : (
          listItems.map((token, index) => (
            <FromToken token={token} index={index} key={uuidv4()} />
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
