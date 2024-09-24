import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosError } from 'axios';

type ApiResponse<T> = {
  ok: boolean;
  status: number;
  payload: T;
  error?: AxiosError;
};

type ApiParams<T> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: T;
  query?: Record<string, any>;
  headers?: AxiosRequestHeaders;
};

const useApi = <T>() => {
  const callApi = async <R>(url: string, params: ApiParams<R>): Promise<ApiResponse<T>> => {
    const headers = {
      'Content-Type': 'application/json',
      ...(params?.headers || {}),
    };

    if (params.query) {
      url = url + `?${new URLSearchParams(params.query || {})}`
    }

    const config: AxiosRequestConfig = {
      url,
      baseURL: process.env.REACT_APP_API_URL || '/',
      method: params.method,
      responseType: 'json',
      headers,
      data: params.body,
    }

    try {
      const response: AxiosResponse = await axios.request(config);

      return {
        ok: response.status - 200 < 100,
        status: response.status,
        payload: response.data || {},
      }
    } catch (err) {
      const { response } = err as { response: AxiosResponse };

      return {
        ok: false,
        status: response?.status,
        payload: response?.data ?? {},
      };
    }
  };

  return callApi;
};

export default useApi;
