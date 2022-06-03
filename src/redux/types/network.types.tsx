export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

export interface NetworkState {
  isFetching: boolean;
  method: string;
  url: string;
  scopes: string[];
}

export interface StartFetching {
  method: string;
  url: string;
  scopes: string[];
}
