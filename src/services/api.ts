import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';
import { REQUEST_TIMEOUT, BACKEND_URL } from '../const';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);

        processErrorHandle(detailMessage.message);
      } else if (error.request) {
        // Ошибка сети или тайм-аут
        processErrorHandle('Network error or timeout');
      } else {
        // Другие ошибки
        processErrorHandle(error.message);
      }

      throw error;
    }
  );

  return api;
};
