import {API_URL} from '@env';
import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {scopeService} from '.';
import {store} from '../redux';
import {sendFlashNotification} from '../redux/actions';
import {endFetching, startFetching} from '../redux/actions/network.action';
import {StartFetching} from '../redux/types';
import {translateMessage} from '../utils/error-response.helper';
import {RequestMethod} from './scope/scope.types';

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use(
  config => {
    if (!scopeService.isExcluded(config.url ? config.url : '')) {
      const url = config.url ? config.url : '';
      const method = config.method ? config.method : '';

      const scopes: string[] = scopeService.findPermission(
        url,
        method.toLocaleUpperCase() as RequestMethod,
      );

      if (scopes.length > 0) {
        const _startFetching: StartFetching = {
          method: method,
          url: url,
          scopes: scopes,
        };

        store.dispatch(startFetching(_startFetching));
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

client.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    store.dispatch(endFetching());

    return response;
  },
  ({response}: {response: AxiosResponse<any>}) => {
    store.dispatch(endFetching());

    console.log(`${response.status} || ${response.config.url}`);

    if (response) {
      const code = response.data.code ? response.data.code : -1;

      store.dispatch(
        sendFlashNotification({
          text: translateMessage(code),
          type: 'danger',
        }),
      );

      return Promise.reject({
        code: code,
      });
    }

    return Promise.reject({
      code: -1,
    });
  },
);

export const getLoggedClient = async (): Promise<AxiosInstance> => {
  const {
    tokens: {accessToken},
  } = store.getState().auth;

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  return client;
};

export default client;
