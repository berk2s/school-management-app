import {LoginRequest, LoginResponse} from '.';
import {apiService} from '..';
import {TOKEN_URL, LOGIN_URL} from '@env';

export const loginService = {
  login,
};

async function login(loginRequest: LoginRequest): Promise<LoginResponse> {
  const response: LoginResponse = await apiService.post(
    `${LOGIN_URL}`,
    loginRequest,
  );

  return response;
}
