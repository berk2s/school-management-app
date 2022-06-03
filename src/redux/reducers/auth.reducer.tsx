import {
  AuthState,
  AUTH_STATUS,
  SAVE_TOKENS,
  AUTH_LOGOUT,
  SAVE_USER_INFO,
} from '../types';

const initialState: AuthState = {
  isLoggedIn: false,
  tokens: {
    accessToken: '',
    refreshToken: '',
    expiresIn: -1,
  },
  userInfo: {},
};

export function authReducer(state: AuthState = initialState, action: any) {
  switch (action.type) {
    case SAVE_TOKENS:
      return {
        ...state,
        tokens: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          expiresIn: action.payload.expiresIn,
        },
      };
    case AUTH_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SAVE_USER_INFO: {
      return {
        ...state,
        userInfo: {
          ...action.payload,
        },
      };
    }
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        tokens: {
          accessToken: '',
          refreshToken: '',
          expiresIn: -1,
        },
      };
    default:
      return state;
  }
}
