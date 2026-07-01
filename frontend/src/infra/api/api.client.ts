import axios from "axios";
import { LocalStorage } from "../../utils/localstorage.utils";
import { type APIClientParams } from "../types/axios.type";
import { type AxiosPromise } from "axios";

const ax = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export class ApiClient {
  private async apiClient<T>({
    method,
    url,
    data,
    headers,
    queryParams,
  }: APIClientParams): Promise<T> {
    let response: AxiosPromise<T>;

    switch (method) {
      case "GET":
        response = ax.get<T>(url, { params: queryParams, headers });
        break;
      case "POST":
        response = ax.post<T>(url, data, { params: queryParams, headers });
        break;
      case "DELETE":
        response = ax.delete<T>(url, { params: queryParams, headers });

        break;
      case "PUT":
        response = ax.put<T>(url, data, { params: queryParams, headers });
        break;
      case "PATCH":
        response = ax.patch<T>(url, data, { params: queryParams, headers });
        break;
      default:
        throw new Error("Method not supported");
    }

    return response.then((response) => response.data);
  }

  get<T>(path = "", headers = {}) {
    return this.apiClient<T>({
      method: "GET",
      url: path,
      headers,
    });
  }

  post<T>(url = "", data = {}, headers = {}, queryParams = {}) {
    return this.apiClient<T>({
      method: "POST",
      url,
      data,
      headers,
      queryParams,
    });
  }

  delete<T>(url = "", headers = {}, queryParams = {}) {
    return this.apiClient<T>({
      method: "DELETE",
      url,
      headers,
      queryParams,
    });
  }

  put<T>(url = "", data = {}, headers = {}, queryParams = {}) {
    return this.apiClient<T>({
      method: "PUT",
      url,
      data,
      headers,
      queryParams,
    });
  }

  patch<T>(url = "", data = {}, headers = {}, queryParams = {}) {
    return this.apiClient<T>({
      method: "PATCH",
      url,
      data,
      headers,
      queryParams,
    });
  }
}

ax.interceptors.request.use((req) => {
  const authToken = LocalStorage.getItem("token");

  if (authToken) {
    req.headers["Authorization"] = `Bearer Token ${authToken}`;
  }

  return req;
});

ax.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error || {};

    if (response && response.status === 401) {
      LocalStorage.clearStorage();

      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

export const apiClient = new ApiClient();
