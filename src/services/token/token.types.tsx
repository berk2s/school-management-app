type GrantType = 'check_token' | 'refresh_token' | 'revoke';

export interface TokenRequest {
  grant_type?: GrantType;
  client_id?: string;
  refresh_token?: string;
  access_token?: string;
  scopes?: string[] | string;
  username?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
