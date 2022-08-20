import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../app/store";
import ArrowDownFont from "../../../assets/arrow-down-sign-to-navigate.png";
import bridgeIcon from "../../../assets/brooklyn-bridge.png";
import bnblightIcon from "../../../assets/img/chains/binance-light.svg";
import fantomIcon from "../../../assets/img/chains/fantom.svg";
import {
  changeResponseData,
  changeShowRoute,
} from "../../../features/route/routeSlice";
import DexBox from "./DexBox";
// From Box Styles
const MainStyled = styled.div`
  margin-bottom: 30px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const HeaderStyled = styled.div`
  margin-bottom: 40px;
`;
const MenusStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

function Route() {
  const [active, setActive] = useState(1);
  const fromToken = useSelector(({ route }: RootState) => route.fromToken);
  const toToken = useSelector(({ route }: RootState) => route.toToken);
  const fromChain = useSelector(({ route }: RootState) => route.fromChain);
  const toChain = useSelector(({ route }: RootState) => route.toChain);
  const amount = useSelector(({ route }: RootState) => route.amount);
  const showRoute = useSelector(({ route }: RootState) => route.showRoute);
  const responseData = useSelector(
    ({ route }: RootState) => route.responseData
  );
  const [masir, setMasir] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (responseData.data?.routes[0].operations_seperated != undefined) {
      setMasir(responseData.data.routes[0].operations_seperated);
    }
  }, []);

  return (
    <>
      {showRoute ? (
        <MainStyled>
          <HeaderStyled>
            <div className="flex justify-between items-end mt-[8px]">
              <div className="text-[24px] text-black font-[700] leading-[28px]">
                Smart Routing
              </div>
            </div>
            <div className="text-[14px] leading-[16px] text-[#929292] mt-2">
              This route optimizes your total output by considering split
              routes, multiple hops, and the gas cost of each step.
            </div>
          </HeaderStyled>
          {fromChain !== toChain ? (
            <MenusStyled className="index-module__menus">
              <div
                onClick={() => setActive(1)}
                className={`${
                  active === 1
                    ? "bg-[#fff] border-[1px] border-solid border-[#bdbdbd]"
                    : "border-none bg-[#f9f9f9]"
                } index-module__item flex flex-col justify-start items-start py-[12px] px-[16px] cursor-pointer`}
              >
                <span className="text-[#3d3d3d] text-[14px] font-[400] leading-[16px] mb-[8px]">
                  {fromChain === 56 ? "BSC" : ""}
                  {fromChain === 250 ? "Fantom" : ""}
                  {fromChain === 97 ? "BSC testnet" : ""}
                </span>
                <div className="flex items-center justify-start">
                  <div
                    data-testid="base-logo-wrapper"
                    className="w-[32px] h-[32px] mr-[6px] bg-[#fff] rounded-[50%] box-border overflow-hidden inline-block"
                  >
                    <img
                      data-testid="base-logo"
                      className="w-[100%] h-[100%]"
                      alt=""
                      src={`https://assets-cdn.trustwallet.com/blockchains/${
                        fromChain === 56 || fromChain === 97
                          ? "smartchain"
                          : fromChain === 250
                          ? "fantom"
                          : ""
                      }/assets/${fromToken.adress}/logo.png`}
                    />
                  </div>
                  <span className="text-[#000] text-[18px] font-[700] leading-[24px]">
                    {fromToken.symbol} / {masir[0]?.operations[0]?.ask_token[3]}
                  </span>
                </div>
                <div className="text-[#ebf0f7] text-[80px] font-[700] leading-[60px] absolute top-[14px] right-[16px]">
                  1
                </div>
              </div>
              <span className="w-[50px] md:w-[100px]">
                <img src={bridgeIcon} alt="" />
              </span>
              <div
                onClick={() => setActive(2)}
                className={`${
                  active === 2
                    ? "bg-[#fff] border-[1px] border-solid border-[#bdbdbd]"
                    : "border-none bg-[#f9f9f9]"
                } index-module__item flex flex-col justify-start items-start py-[12px] px-[16px] cursor-pointer`}
              >
                <span className="text-[#3d3d3d] text-[14px] font-[400] leading-[16px] mb-[8px]">
                  {toChain === 250 ? "Fantom" : ""}
                  {toChain === 56 ? "BSC" : ""}
                  {toChain === 97 ? "BSC testnet" : ""}
                </span>
                <div className="flex items-center justify-start">
                  <span className="text-[#000] text-[18px] font-[700] leading-[24px]">
                    {masir[masir.length - 1]?.operations[0]?.offer_token[3]} /{" "}
                    {toToken.symbol}
                  </span>
                  <div
                    data-testid="base-logo-wrapper"
                    className="w-[32px] h-[32px] ml-[6px] bg-[#fff] rounded-[50%] box-border overflow-hidden inline-block"
                  >
                    <img
                      data-testid="base-logo"
                      className="w-[100%] h-[100%]"
                      alt=""
                      src={`https://assets-cdn.trustwallet.com/blockchains/${
                        toChain === 56 || toChain === 97
                          ? "smartchain"
                          : toChain === 250
                          ? "fantom"
                          : ""
                      }/assets/${toToken.adress}/logo.png`}
                    />
                  </div>
                </div>
                <div className="text-[#ebf0f7] text-[80px] font-[700] leading-[60px] absolute top-[14px] right-[16px]">
                  2
                </div>
              </div>
            </MenusStyled>
          ) : (
            ""
          )}

          <div>
            <div className="flex items-center justify-between relative z-[1]">
              <div className="inline-block h-[36px] relative w-[36px]">
                <div className="w-[32px] h-[32px] absolute left-0 top-0 z-[1] bg-[#fff] rounded-[50%] box-border inline-block overflow-hidden">
                  <img
                    className="w-[100%] h-[100%]"
                    alt=""
                    src={`https://assets-cdn.trustwallet.com/blockchains/${
                      (fromChain === 56 || fromChain === 97) &&
                      active === 1 &&
                      fromChain === toChain
                        ? "smartchain"
                        : (fromChain === 56 || fromChain === 97) &&
                          active === 1 &&
                          fromChain !== toChain
                        ? "smartchain"
                        : (fromChain === 56 || fromChain === 97) &&
                          active === 2 &&
                          fromChain !== toChain
                        ? "fantom"
                        : (fromChain === 250 || fromChain === 4002) &&
                          active === 1 &&
                          fromChain === toChain
                        ? "fantom"
                        : (fromChain === 250 || fromChain === 4002) &&
                          active === 1 &&
                          fromChain !== toChain
                        ? "fantom"
                        : (fromChain === 250 || fromChain === 4002) &&
                          active === 2 &&
                          fromChain !== toChain
                        ? "smartchain"
                        : ""
                    }/assets/${
                      active === 1
                        ? masir[active === 1 ? 0 : active === 2 ? 2 : 0]
                            ?.operations[0]?.offer_token[0]
                        : active === 2
                        ? masir[active === 2 ? 2 : active === 1 ? 0 : 0]
                            ?.operations[0]?.offer_token[0]
                        : ""
                    }/logo.png`}
                  />
                </div>
                <div className="w-[18px] h-[18px] border-[1px] border-[#fff] bottom-0 absolute right-0 z-[2] rounded-[50%] box-border inline-block overflow-hidden">
                  <img
                    className="w-[100%] h-[100%]"
                    alt=""
                    src={
                      (fromChain === 56 || fromChain === 97) &&
                      active === 1 &&
                      fromChain === toChain
                        ? bnblightIcon
                        : (fromChain === 56 || fromChain === 97) &&
                          active === 1 &&
                          fromChain !== toChain
                        ? bnblightIcon
                        : (fromChain === 56 || fromChain === 97) &&
                          active === 2 &&
                          fromChain !== toChain
                        ? fantomIcon
                        : (fromChain === 250 || fromChain === 4002) &&
                          active === 1 &&
                          fromChain === toChain
                        ? fantomIcon
                        : (fromChain === 250 || fromChain === 4002) &&
                          active === 1 &&
                          fromChain !== toChain
                        ? fantomIcon
                        : (fromChain === 250 || fromChain === 4002) &&
                          active === 2 &&
                          fromChain !== toChain
                        ? bnblightIcon
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="inline-block h-[36px] relative w-[36px]">
                <div className="w-[32px] h-[32px] absolute left-0 top-0 z-[1] bg-[#fff] rounded-[50%] box-border inline-block overflow-hidden">
                  <img
                    className="w-[100%] h-[100%]"
                    alt=""
                    src={`https://assets-cdn.trustwallet.com/blockchains/${
                      (toChain === 56 || toChain === 97) &&
                      active === 1 &&
                      fromChain === toChain
                        ? "smartchain"
                        : (toChain === 56 || toChain === 97) &&
                          active === 1 &&
                          fromChain !== toChain
                        ? "fantom"
                        : (toChain === 56 || toChain === 97) &&
                          active === 2 &&
                          fromChain !== toChain
                        ? "smartchain"
                        : (toChain === 250 || toChain === 4002) &&
                          active === 1 &&
                          fromChain === toChain
                        ? "fantom"
                        : (toChain === 250 || toChain === 4002) &&
                          active === 1 &&
                          fromChain !== toChain
                        ? "smartchain"
                        : (toChain === 250 || toChain === 4002) &&
                          active === 2 &&
                          fromChain !== toChain
                        ? "fantom"
                        : ""
                    }/assets/${
                      active === 1
                        ? masir[active === 1 ? 0 : active === 2 ? 2 : 0]
                            ?.operations[
                            (masir[active === 1 ? 0 : active === 2 ? 2 : 0]
                              ?.operations).length - 1
                          ]?.ask_token[0]
                        : active === 2
                        ? masir[active === 2 ? 2 : active === 1 ? 0 : 0]
                            ?.operations[
                            (masir[active === 2 ? 2 : active === 1 ? 0 : 0]
                              ?.operations).length - 1
                          ]?.ask_token[0]
                        : ""
                    }/logo.png`}
                  />
                </div>
                <div className="w-[18px] h-[18px] border-[1px] border-[#fff] bottom-0 absolute right-0 z-[2] rounded-[50%] box-border inline-block overflow-hidden">
                  <img
                    className="w-[100%] h-[100%]"
                    alt=""
                    src={
                      (toChain === 56 || toChain === 97) &&
                      active === 1 &&
                      fromChain === toChain
                        ? bnblightIcon
                        : (toChain === 56 || toChain === 97) &&
                          active === 1 &&
                          fromChain !== toChain
                        ? fantomIcon
                        : (toChain === 56 || toChain === 97) &&
                          active === 2 &&
                          fromChain !== toChain
                        ? bnblightIcon
                        : (toChain === 250 || toChain === 4002) &&
                          active === 1 &&
                          fromChain === toChain
                        ? fantomIcon
                        : (toChain === 250 || toChain === 4002) &&
                          active === 1 &&
                          fromChain !== toChain
                        ? bnblightIcon
                        : (toChain === 250 || toChain === 4002) &&
                          active === 2 &&
                          fromChain !== toChain
                        ? fantomIcon
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
            {/* route dexes */}
            <div className="relative pr-[20px] pl-[16px] -mt-[10px]">
              <span className="okex_swap_iconfont icon_icon_Arrow_Carets1 index-module__down-arrow"></span>
              <span className="okex_swap_iconfont icon_icon_Arrow_Carets1 index-module__up-arrow"></span>
              <div className="relative">
                <div className="pr-[18px] relative pl-[92px]">
                  <div className="border-[1px] border-dashed border-[#bdbdbd] rounded-[8px] border-t-[transparent] bottom-[50%] left-0 absolute right-0 top-0"></div>
                  <div className="absolute items-center bottom-[50%] flex h-[20px] justify-between max-w-[64px] translate-y-[10px] z-10 left-[18px] w-[66px]">
                    <div className="bg-[rgb(241,245,249)] text-[#000] text-[16px] font-[500] leading-[20px] px-[2px]">
                      100%
                    </div>
                    <div className="flex h-[16px] justify-center w-[16px]">
                      <span className="okex_swap_iconfont icon_icon_Arrow_Carets1 index-module__icon -rotate-90 w-[12px]">
                        <img src={ArrowDownFont} alt="" />
                      </span>
                    </div>
                  </div>
                  <div className="items-center flex justify-between">
                    {masir[
                      active === 1 ? 0 : active === 2 ? 2 : 0
                    ]?.operations.map((element, index) => {
                      return (
                        <>
                          <DexBox element={element} key={index} />
                          <div className="z-10 items-center flex h-[16px] justify-center w-[16px]">
                            <span className="okex_swap_iconfont icon_icon_Arrow_Carets1 index-module__icon -rotate-90 w-[12px]">
                              <img src={ArrowDownFont} alt="" />
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainStyled>
      ) : (
        ""
      )}
    </>
  );
}

export default Route;
