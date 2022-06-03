import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {tokenService} from '../services';
import {normalizeScopeArray} from '../utils/scope-helper';
import {
  addScope,
  addScopes,
  logout,
  saveTokens,
  setAuthStatus,
} from './actions';
import {rootReducer} from './reducers';
import {START_FETCHING, Tokens} from './types';

const scopeMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === START_FETCHING) {
    if (action.payload.scopes && action.payload.scopes.length > 0) {
      const scopes = action.payload.scopes;
      let _scopes = normalizeScopeArray(scopes);

      tokenService
        .refreshTokens(_scopes)
        .then((tokens: Tokens) => {
          store.dispatch(saveTokens(tokens));
          store.dispatch(setAuthStatus(true));
          store.dispatch(addScopes(scopes));
        })
        .then(() => {
          next(action);
        })
        .catch(err => {
          store.dispatch(logout());
        });
    } else {
      const expiresIn = store.getState().auth.tokens.expiresIn;

      if (expiresIn && expiresIn !== -1) {
        const scopes: string[] = store.getState().scopes.actualScopes;
        let _scopes = normalizeScopeArray(scopes);

        tokenService
          .refreshTokens(_scopes)
          .then((tokens: Tokens) => {
            store.dispatch(saveTokens(tokens));
            store.dispatch(setAuthStatus(true));
          })
          .then(() => {
            next(action);
          })
          .catch(err => {
            store.dispatch(logout());
          });
      }
    }
  } else {
    next(action);
  }
};

const middleware = composeWithDevTools(applyMiddleware(thunk, scopeMiddleware));

export const store = createStore(rootReducer, middleware);
