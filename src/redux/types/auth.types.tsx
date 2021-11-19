export const SAVE_TOKENS = 'SAVE_TOKENS';
export const AUTH_STATUS = 'AUTH_STATUS';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';

export interface AuthState {
  isLoggedIn: boolean;
  tokens: Tokens;
  userInfo: UserInfo;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserInfo {
  userId?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  userType?: UserType;
  organization?: {
    organizationId?: number;
  };
}

export enum UserType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
}
