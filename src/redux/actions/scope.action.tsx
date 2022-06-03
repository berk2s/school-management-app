import {ADD_SCOPES, ADD_SCOPE, CLEAR_ALL_SCOPES, REMOVE_SCOPE} from '../types';

export function addScopes(scopes: string[]) {
  return {
    type: ADD_SCOPES,
    payload: scopes,
  };
}

export function addScope(scope: string) {
  return {
    type: ADD_SCOPE,
    payload: scope,
  };
}

export function removeScope(scope: string) {
  return {
    type: REMOVE_SCOPE,
    payload: scope,
  };
}

export function clearAllScopes() {
  return {
    type: CLEAR_ALL_SCOPES,
  };
}
