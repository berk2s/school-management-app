import {apiService} from '..';
import {TokenRequest, TokenResponse} from './token.types';
import {TOKEN_URL, CLIENT_ID} from '@env';
import * as Keychain from 'react-native-keychain';
import {Tokens} from '../../redux/types';

export const tokenService = {
  saveTokens,
  refreshTokens,
  checkAccessToken,
  clearTokens,
  getRefreshToken,
};

async function saveTokens(tokens: Tokens): Promise<boolean> {
  try {
    await Keychain.setGenericPassword(
      'refreshToken',
      JSON.stringify(tokens.refreshToken),
    );
  } catch (error) {
    Promise.reject(error);
  }

  return true;
}

async function refreshTokens(scopes: string = ''): Promise<Tokens> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return Promise.reject('Refresh token cannot found');
  }

  const refreshTokenParams: TokenRequest = {
    client_id: CLIENT_ID,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    scopes: scopes,
  };

  const response: TokenResponse = await apiService.post(
    TOKEN_URL,
    null,
    refreshTokenParams,
    {'Content-Type': 'application/x-www-form-urlencoded'},
  );

  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresIn: response.expires_in,
  };
}

async function checkAccessToken(accessToken: string): Promise<boolean> {
  const checkTokenParams: TokenRequest = {
    client_id: CLIENT_ID,
    grant_type: 'check_token',
    access_token: accessToken,
  };

  await apiService.post(TOKEN_URL, null, checkTokenParams, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  return true;
}

async function clearTokens(): Promise<void> {
  const refreshToken: string | null = await getRefreshToken();
  // const username: string | null = await userService.getUsername();

  if (!refreshToken) {
    //    Promise.reject('Cannot find refresh token');
    return;
  }

  const revokeTokenParams: TokenRequest = {
    client_id: CLIENT_ID,
    grant_type: 'revoke',
    refresh_token: refreshToken ? refreshToken : '',
    username: 'username',
  };

  const revokeToken = await apiService.post(
    TOKEN_URL,
    null,
    revokeTokenParams,
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  );

  await Keychain.resetGenericPassword();
}

async function getRefreshToken(): Promise<string | null> {
  let refreshToken: string | null = null;
  try {
    const tokens = await Keychain.getGenericPassword();
    if (tokens) {
      refreshToken = JSON.parse(tokens.password);

      if (refreshToken) {
        return refreshToken;
      }

      return null;
    }
  } catch (error) {
    return null;
  }

  return refreshToken;
}
