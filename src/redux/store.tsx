import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {tokenService} from '../services';
import {logout, saveTokens, setAuthStatus} from './actions';
import {rootReducer} from './reducers';
import {START_FETCHING, Tokens} from './types';

const scopeMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === START_FETCHING) {
    if (action.payload.scopes && action.payload.scopes.length > 0) {
      const scopes = action.payload.scopes;
      let _scopes = '';
      for (let i = 0; i < scopes.length; i++) {
        _scopes += `${scopes[i]} `;
      }
      _scopes = _scopes.trim();

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
  } else {
    next(action);
  }
};

const middleware = composeWithDevTools(applyMiddleware(thunk, scopeMiddleware));

export const store = createStore(rootReducer, middleware);
