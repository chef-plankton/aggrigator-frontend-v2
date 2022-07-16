import React, { useState } from "react";
import styled from "styled-components";
import ArrowDownFont from "../../../assets/arrow-down-sign-to-navigate.png";
// From Box Styles
const MainStyled = styled.div`
  margin-bottom: 80px;
  margin-top: 30px;
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
  const [active, setActive] = useState(true);
  return (
    <MainStyled>
      <HeaderStyled>
        <div className="flex justify-between items-end mt-[8px]">
          <div className="text-[24px] text-black font-[700] leading-[28px]">
            Smart Routing
          </div>
        </div>
        <div className="text-[14px] leading-[16px] text-[#929292] mt-2">
          This route optimizes your total output by considering split routes,
          multiple hops, and the gas cost of each step.
        </div>
      </HeaderStyled>
      <MenusStyled className="index-module__menus">
        <div
          className={`${
            active ? "bg-[#fff] border-[1px] border-solid border-[#bdbdbd]" : "border-none bg-[#f9f9f9]"
          } index-module__item flex flex-col justify-start items-start py-[12px] px-[16px] cursor-pointer`}
        >
          <span className="text-[#3d3d3d] text-[14px] font-[400] leading-[16px] mb-[8px]">
            BSC
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
                src="https://static.coinall.ltd/cdn/wallet/logo/DIGG-0x798d1be841a82a273720ce31c822c61a67a601c3.png"
              />
            </div>
            <span className="text-[#000] text-[18px] font-[700] leading-[24px]">
              DIGG
            </span>
          </div>
          <div className="text-[#ebf0f7] text-[80px] font-[700] leading-[60px] absolute top-[14px] right-[16px]">
            1
          </div>
        </div>
        <span className="okex_swap_iconfont icon_icon_Arrow_Chevrons index-module__menu-arrow">
          <img src={ArrowDownFont} alt="" />
        </span>
        <div className="index-module__item flex flex-col justify-start items-start py-[12px] px-[16px] bg-[#f9f9f9] border-none cursor-pointer">
          <span className="text-[#3d3d3d] text-[14px] font-[400] leading-[16px] mb-[8px]">
            Fantom
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
                src="https://static.coinall.ltd/cdn/wallet/logo/DIGG-0x798d1be841a82a273720ce31c822c61a67a601c3.png"
              />
            </div>
            <span className="text-[#000] text-[18px] font-[700] leading-[24px]">
              BSC
            </span>
          </div>
          <div className="text-[#ebf0f7] text-[80px] font-[700] leading-[60px] absolute top-[14px] right-[16px]">
            2
          </div>
        </div>
      </MenusStyled>
      <div>
        <div className="flex items-center justify-between relative z-[1]">
          <div className="inline-block h-[36px] relative w-[36px]">
            <div className="w-[32px] h-[32px] absolute left-0 top-0 z-[1] bg-[#fff] rounded-[50%] box-border inline-block overflow-hidden">
              <img
                className="w-[100%] h-[100%]"
                alt=""
                src="https://static.coinall.ltd/cdn/wallet/logo/DIGG-0x798d1be841a82a273720ce31c822c61a67a601c3.png"
              />
            </div>
            <div className="w-[18px] h-[18px] border-[1px] border-[#fff] bottom-0 absolute right-0 z-[2] rounded-[50%] box-border inline-block overflow-hidden">
              <img
                className="w-[100%] h-[100%]"
                alt=""
                src="https://static.coinall.ltd/cdn/wallet/logo/ETH-20220328.png"
              />
            </div>
          </div>
          <div className="inline-block h-[36px] relative w-[36px]">
            <div className="w-[32px] h-[32px] absolute left-0 top-0 z-[1] bg-[#fff] rounded-[50%] box-border inline-block overflow-hidden">
              <img
                className="w-[100%] h-[100%]"
                alt=""
                src="https://static.coinall.ltd/cdn/wallet/logo/DIGG-0x798d1be841a82a273720ce31c822c61a67a601c3.png"
              />
            </div>
            <div className="w-[18px] h-[18px] border-[1px] border-[#fff] bottom-0 absolute right-0 z-[2] rounded-[50%] box-border inline-block overflow-hidden">
              <img
                className="w-[100%] h-[100%]"
                alt=""
                src="https://static.coinall.ltd/cdn/wallet/logo/ETH-20220328.png"
              />
            </div>
          </div>
        </div>
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
                  <span className="okex_swap_iconfont icon_icon_Arrow_Carets1 index-module__icon -rotate-90">
                    <img src={ArrowDownFont} alt="" />
                  </span>
                </div>
              </div>
              <div className="items-center flex justify-between">
                <div className="z-10 bg-[#f7f7f7] rounded-[6px] flex-1 overflow-hidden py-[12px] px-[10px]">
                  <div className="mb-[12px] items-center flex justify-start">
                    <div className="w-[24px] h-[24px] mr-1">
                      <img
                        className="w-[100%] h-[100%]"
                        alt=""
                        src="https://static.coinall.ltd/cdn/wallet/logo/wbtc01.png"
                      />
                    </div>
                    <div className="ellipsis index-module__token-name">
                      WBTC
                    </div>
                  </div>
                  <div className="bg-white rounded-[6px] text-[#545454] py-[2px] px-[8px] justify-between items-center flex">
                    <span className="font-12 index-module__dex-name index-module__like-link index-module__enable">
                      Balancer V2
                    </span>
                    <span className="font-12 index-module__like-link">
                      100%
                    </span>
                  </div>
                </div>
                <div className="z-10 items-center flex h-[16px] justify-center w-[16px]">
                  <span className="okex_swap_iconfont icon_icon_Arrow_Carets1 index-module__icon -rotate-90">
                    <img src={ArrowDownFont} alt="" />
                  </span>
                </div>
                <div className="z-10 bg-[#f7f7f7] rounded-[6px] flex-1 overflow-hidden py-[12px] px-[10px]">
                  <div className="mb-[12px] items-center flex justify-start">
                    <div className="w-[24px] h-[24px] mr-1">
                      <img
                        className="w-[100%] h-[100%]"
                        alt=""
                        src="https://static.coinall.ltd/cdn/wallet/logo/wbtc01.png"
                      />
                    </div>
                    <div className="ellipsis index-module__token-name">
                      WBTC
                    </div>
                  </div>
                  <div className="bg-white rounded-[6px] text-[#545454] py-[2px] px-[8px] justify-between items-center flex">
                    <span className="font-12 index-module__dex-name index-module__like-link index-module__enable">
                      Balancer V2
                    </span>
                    <span className="font-12 index-module__like-link">
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainStyled>
  );
}

export default Route;
