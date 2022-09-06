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
    FTM = "FANTOM",
    BRIDGE = "BRIDGE",
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
    input_amount_wei: number,
    return_amount_wei: string,
    routes: Array<RouteRoutes>
}
export interface RouteRoutes {
    input_amount: number
    operations_seperated: Array<RouteOperationsSeparated>
    operations: Array<RouteRegularOperations | RouteStargateBridgeOperations>

}
export interface RouteOperationsSeparated {
    chain: NetworkName,
    chain_id: number,
    gas_fee: number,
    operations: Array<RouteRegularOperations | RouteStargateBridgeOperations>
}
export class RouteRegularOperations {
    constructor(partial: Partial<RouteRegularOperations> = {}) {
        Object.assign(this, partial)
    }
    amount_in: number
    amount_out: number
    offer_token: Array<string>
    ask_token: Array<string>
    router_addr: string
    contract_addr: string
    exchange: BridgeName & string
}
export class RouteStargateBridgeOperations {
    constructor(partial: Partial<RouteStargateBridgeOperations> = {}) {
        Object.assign(this, partial)
    }
    amount_in: number
    amount_out: number
    amount_out_wei: string
    offer_token: Array<string>
    ask_token: Array<string>
    exchange: BridgeName
    contract_addr: string
    router_addr: string
    ask_bridge_data: { chain_id: number, pool_id: number }
    offer_bridge_data: { chain_id: number, pool_id: number }
}