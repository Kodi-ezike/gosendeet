import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export interface IAdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}