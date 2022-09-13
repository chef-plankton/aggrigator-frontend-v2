export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type RequestPath = string;
export interface TokenListApi {
  contract_addr: string;
  decimals: number;
  name: string;
  symbol: string;
}
