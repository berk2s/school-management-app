import {combineReducers} from 'redux';
import {alertReducer} from './alert.reducer';
import {authReducer} from './auth.reducer';
import {feedReducer} from './feed.reducer';
import {networkReducer} from './network.reducer';
import {organizationReducer} from './organization.reducer';

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  network: networkReducer,

  organization: organizationReducer,

  feed: feedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
