export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type RequestPath = string;
export interface tokenListApi {
  contract_addr: string;
  decimals: number;
  name: string;
  symbol: string;
}
