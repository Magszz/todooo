export interface APIClientParams {
  method: string;
  url: string;
  headers?: object;
  data?: object;
  queryParams?: object;
}

export interface ErrType {
  message: string;
}
