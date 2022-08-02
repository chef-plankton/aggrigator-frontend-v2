import { BigNumber } from "ethers";

export interface NetworkInfo {
    name: NetworkName;
    chainId: ChainId
}
export enum ChainId {
    BSC = 56,
    FTM = 250,
}
export enum NetworkName {
    BSC = "BSC",
    FTM = "FTM",
}

export enum BridgeName {
    Stargate = "stargate"
}
export enum SwapTypes {
    Regular = 1,
    StargateBridge = 2,
}
export interface RouteResponseDto {
    input_amount: number,
    return_amount: number,
    operationsSeparated: Array<RouteOperationsSeparated>
}
export interface RouteOperationsSeparated {
    chain: string,
    chain_id: number,
    gas_fee: number,
    operations: Array<RouteRegularOperations >
}
export interface RouteRegularOperations {
    amount_in: number,
    amount_out: number,
    offer_token: Array<string>,
    ask_token: Array<string>,
    router_addr: string,
    contract_addr: string,
    exchange: string,
}
export interface RouteStargateBridgeOperations {
    offer_token: Array<string>,
    ask_token: Array<string>,
    exchange: BridgeName,
    router_addr: string,
    ask_bridge_data: string[],
    offer_bridge_data: string[],
}