import {
  authService,
  LoginForm,
  loginService,
  tokenService,
} from '../../services';
import {
  AUTH_STATUS,
  SAVE_TOKENS,
  AUTH_LOGOUT,
  Tokens,
  UserInfo,
  SAVE_USER_INFO,
} from '../types';
import {VIEW_ANNOUNCEMENTS, PROFILE_MANAGE} from '@env';
import {sendFlashNotification} from '.';
import {setOrganization} from './organization.action';

export function login(loginData: LoginForm) {
  return (dispatch: any) => {
    return loginService
      .login({
        ...loginData,
        scopes: PROFILE_MANAGE,
      })
      .then(response => ({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        expiresIn: response.expires_in,
      }))
      .then((tokens: Tokens) => {
        dispatch(
          sendFlashNotification({
            text: 'Süper! Giriş başarılı, bekleyiniz.',
            type: 'success',
          }),
        );

        dispatch(saveTokens(tokens));
        dispatch(setAuthStatus(true));
      })
      .then(() => {
        dispatch(getUserInfo());
      })
      .catch(err => {});
  };
}

export function getUserInfo() {
  return (dispatch: any) => {
    return authService
      .getUserInfo()
      .then((userInfo: UserInfo) => {
        dispatch({
          type: SAVE_USER_INFO,
          payload: {
            userId: userInfo.userId ?? null,
            username: userInfo.username ?? null,
            firstName: userInfo.firstName ?? null,
            lastName: userInfo.lastName ?? null,
            phoneNumber: userInfo.phoneNumber ?? null,
            email: userInfo.email ?? null,
            userType: userInfo.userType ?? null,
            organization: {
              organizationId: userInfo.organization?.organizationId ?? null,
            },
          },
        });

        if (userInfo.organization?.organizationId) {
          dispatch(setOrganization(userInfo.organization.organizationId));
        }
      })
      .catch(err => {});
  };
}

export function refreshTokens(scopes: string = VIEW_ANNOUNCEMENTS) {
  return (dispatch: any) => {
    return tokenService
      .refreshTokens(scopes)
      .then((tokens: Tokens) => {
        dispatch(saveTokens(tokens));
        dispatch(setAuthStatus(true));
      })
      .catch(err => {
        dispatch(logout());
      });
  };
}

export function setAuthStatus(status: boolean) {
  return {
    type: AUTH_STATUS,
    payload: status,
  };
}

export function saveTokens(tokens: Tokens) {
  return (dispatch: any) => {
    return tokenService
      .saveTokens(tokens)
      .then(() => {
        dispatch({
          type: SAVE_TOKENS,
          payload: tokens,
        });
      })
      .then(() => {
        dispatch(getUserInfo());
      })
      .catch(err => {
        dispatch(logout());
      });
  };
}

export function logout() {
  return (dispatch: any) => {
    return tokenService
      .clearTokens()
      .then(() => {
        dispatch({
          type: AUTH_LOGOUT,
        });
      })
      .catch(err => {});
  };
}
