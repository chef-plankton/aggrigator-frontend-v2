import axios from "axios";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import CloseIcon from "../../../assets/img/close.png";
import SearchIcon from "../../../assets/img/search-line.png";
import { changeModalStatus } from "../../../features/modals/modalsSlice";
import FromTokenlistIsLoading from "../From/FromTokenlistIsLoading";
import ToToken from "./ToToken";
import { v4 as uuidv4 } from "uuid";
import { getTokenlist } from "../../../config/api";
import { TokenListApi } from "../../../config/api/types";
import { NetworkName } from "../../../config/constants/types";
const StyledInput = styled.input<HTMLAttributes<HTMLInputElement>>`
  width: 100%;
  height: 48px;
  padding: 15px 15px;
  padding-left: 45px;
  margin-bottom: 30px;
  margin-top: 10px;
  position: relative;
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid #414141;
  backdrop-filter: blur(30px);
  color: white;
  font-size: 20px;
  line-height: 20px;
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 16px;
  }
  :-ms-input-placeholder {
    font-size: 16px;
  }
`;
function ToTokenlist() {
  const dispatch = useDispatch();
  const chainId = useSelector(({ route }: RootState) => route.toChain);
  const [tokens, setTokens] = useState<TokenListApi[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orgListItems, setOrgListItems] = useState<TokenListApi[]>([]);
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
    // let url = "";

    // if (chainId === 56) {
    //   url = "http://192.64.112.22:8084/tokens?chain=bsc&limit=1000";
    // }
    // if (chainId === 250) {
    //   url = "http://192.64.112.22:8084/tokens?chain=fantom&limit=1000";
    // }
    // if (chainId === 97) {
    //   url = "http://localhost:4000/BSC-testnet";
    // }

    // axios.get(url).then((res) => {
    //   setOrgListItems(res.data);
    //   setTokens(res.data);
    // });
    getTokenlist(chainId === 250 ? NetworkName.FTM : NetworkName.BSC).then(
      (res) => {
        setOrgListItems(res.data);
        setTokens(res.data);
      }
    );
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
      <div className='flex justify-between items-center mb-5 pb-4 border-b-[2px] border-[#ffffff1a] bg-clip-padding'>
        <div>
          <h4 className='font-medium text-white'>Select a token</h4>
        </div>
        <div>
          <img
            src={CloseIcon}
            alt=''
            onClick={() => dispatch(changeModalStatus(false))}
            className='cursor-pointer w-[15px]'
          />
        </div>
      </div>

      {/* Tokens list search box */}
      <div className='relative'>
        <StyledInput
          type='text'
          placeholder='Search name or paste address'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img src={SearchIcon} alt="" className="absolute top-[28px] left-[15px] w-[16px]" />
      </div>

      {/* Tokens list box */}
      <div
        className='flex flex-col w-[100%] overflow-y-scroll h-[500px] scrollbar'
        onScroll={handleScroll}
      >
        {tokens.length == 0 ? (
          // is Loading Component
          <FromTokenlistIsLoading />
        ) : (
          listItems.map((token, index) => (
            <ToToken token={token} index={index} key={uuidv4()} />
          ))
        )}
      </div>
    </>
  );
}

export default ToTokenlist;
