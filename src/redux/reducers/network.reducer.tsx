import {END_FETCHING, NetworkState, START_FETCHING} from '../types';

const initialState: NetworkState = {
  isFetching: false,
  method: '',
  url: '',
  scopes: [],
};

export function networkReducer(
  state: NetworkState = initialState,
  action: any,
) {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        isFetching: true,
        url: action.payload.url,
        method: action.payload.method,
        scopes: action.payload.scopes,
      };
    case END_FETCHING:
      return {
        ...state,
        isFetching: false,
        url: '',
        method: '',
        scopes: [],
      };
    default:
      return state;
  }
}
