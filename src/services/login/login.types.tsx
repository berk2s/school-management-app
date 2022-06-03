export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginRequest {
  username: string;
  password: string;
  scopes: string;
}

export interface LoginForm {
  username: string;
  password: string;
}
