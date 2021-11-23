import {combineReducers} from 'redux';
import {alertReducer} from './alert.reducer';
import {authReducer} from './auth.reducer';
import {feedReducer} from './feed.reducer';
import {metadataReducer} from './metadata.reducer';
import {networkReducer} from './network.reducer';
import {organizationReducer} from './organization.reducer';
import {scopeReducer} from './scope.reducer';

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  network: networkReducer,
  scope: scopeReducer,
  metadata: metadataReducer,

  organization: organizationReducer,

  feed: feedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
