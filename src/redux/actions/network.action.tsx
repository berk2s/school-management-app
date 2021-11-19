import {END_FETCHING, StartFetching, START_FETCHING} from '../types';

export function startFetching(_startFetching: StartFetching) {
  return {
    type: START_FETCHING,
    payload: _startFetching,
  };
}

export function endFetching() {
  return {
    type: END_FETCHING,
  };
}
