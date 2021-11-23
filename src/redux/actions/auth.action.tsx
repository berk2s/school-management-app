import {
  authService,
  ChangingPassword,
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
import {userService, UpdatingUserProfile} from '../../services';
import {RootState} from '../reducers';
import {normalizeScopeArray} from '../../utils/scope-helper';

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
      })
      .then(() => {
        dispatch(setAuthStatus(true));
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

export function updateProfile(updatingProfile: UpdatingUserProfile) {
  return (dispatch: any) => {
    return userService
      .updateProfile(updatingProfile)
      .then(() => {
        dispatch(getUserInfo());
      })
      .then(() => {
        dispatch(
          sendFlashNotification({
            text: 'Kullanıcı bilgileriniz güncellendi',
            type: 'success',
          }),
        );
      })
      .catch(() => {});
  };
}

export function changePassword(changingPassword: ChangingPassword) {
  return (dispatch: any) => {
    return userService
      .changePassword(changingPassword)
      .then(() => {
        dispatch(
          sendFlashNotification({
            text: 'Şifreniz değiştirildi',
            type: 'success',
          }),
        );
      })
      .catch(() => {});
  };
}

export function refreshTokens(scopes: string = VIEW_ANNOUNCEMENTS) {
  return (dispatch: any) => {
    console.log('New token has been requested ', scopes);

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

        return tokens.expiresIn;
      })
      .then((expiresIn: number) => {
        dispatch(scheduleRefreshing(expiresIn));
      })
      .then(() => {
        dispatch(getUserInfo());
      })
      .catch(err => {
        dispatch(logout());
      });
  };
}

export function scheduleRefreshing(expiresIn: number) {
  return (dispatch: any, getState: () => RootState) => {
    const scopes = getState().scope.actualScopes;
    let _scopes = normalizeScopeArray(scopes);

    return tokenService
      .scheduleRefreshing(expiresIn, _scopes)
      .then(() => {})
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
      .then(() => {
        dispatch(setAuthStatus(false));
      })
      .catch(err => {});
  };
}
