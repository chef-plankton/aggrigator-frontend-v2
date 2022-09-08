import { BigNumber } from "ethers";

export interface NetworkInfo {
  name: NetworkName;
  chainId: ChainId;
}
export enum ChainId {
  BSC = 56,
  FTM = 250,
}
export enum NetworkName {
  BSC = "BSC",
  FTM = "FANTOM",
  BRIDGE = "BRIDGE",
}

export enum BridgeName {
  Stargate = "stargate",
}
export enum SwapTypes {
  Regular = 1,
  StargateBridge = 2,
}
export interface RouteResponseDto {
  best_alt: number;
  gas_fee_in_usd: number;
  input_amount: number;
  input_amount_in_usd: number;
  input_amount_wei: number;
  price_impact: number;
  return_amount: number;
  return_amount_in_usd: number;
  return_amount_wei: string;
  routes: Array<RouteRoutes>;
}

export interface OneChainSwapRoutes {
  srcToken: string;
  dstToken: string;
  srcAmount: string;
  dstMinAmount: string;
  swapType: number;
  protocolType: number;
  path: Array<string>;
  protocolAddresses: Array<string>;
}
export interface OneChainSwapDescriptionStruct {
  srcToken: string;
  dstToken: string;
  srcDesiredAmount: string;
  dstDesiredMinAmount: string;
  to: string;
  dstChainId: number;
  dstPoolId: number;
  srcPoolId: number;
  gasForSwap: BigNumber;
  dstContractAddress: string;
  isRegularTransfer: boolean;
  routes: Array<OneChainSwapRoutes>;
}
export interface MultiChainSwapRoutes {
  srcToken: string;
  dstToken: string;
  srcAmount: string;
  dstMinAmount: string;
  swapType: number;
  protocolType: number;
  path: Array<string>;
  protocolAddresses: Array<string>;
}
export interface MultiChainSwapDescriptionStruct {
  srcToken: string;
  dstToken: string;
  srcDesiredAmount: string;
  dstDesiredMinAmount: string;
  to: string;
  dstChainId: number;
  dstPoolId: number;
  srcPoolId: number;
  gasForSwap: BigNumber;
  dstContractAddress: string;
  isRegularTransfer: boolean;
  routes: Array<MultiChainSwapRoutes>;
}
export interface RouteRoutes {
  input_amount: number;
  input_amount_wei: number;
  operations: Array<RouteRegularOperations | RouteStargateBridgeOperations>;
  operations_seperated: Array<RouteOperationsSeparated>;
  return_amount: number;
  return_amount_wei: string;
}
export interface RouteOperationsSeparated {
  chain: NetworkName;
  chain_id?: number;
  gas_fee?: number;
  operations: Array<RouteRegularOperations | RouteStargateBridgeOperations>;
}
export class RouteRegularOperations {
  constructor(partial: Partial<RouteRegularOperations> = {}) {
    Object.assign(this, partial);
  }
  amount_in: number;
  amount_in_wei: string;
  amount_out: number;
  amount_out_wei: string;
  ask_token: Array<string>;
  contract_addr: string;
  exchange: BridgeName & string;
  offer_token: Array<string>;
  router_addr: string;
}
export class RouteStargateBridgeOperations {
  constructor(partial: Partial<RouteStargateBridgeOperations> = {}) {
    Object.assign(this, partial);
  }
  amount_in: number;
  amount_in_wei: string;
  amount_out: number;
  amount_out_wei: string;
  ask_bridge_data: { chain_id: number; pool_id: number };
  ask_token: Array<string>;
  contract_addr: string;
  exchange: BridgeName;
  offer_bridge_data: { chain_id: number; pool_id: number };
  offer_token: Array<string>;
  router_addr: string;
}
