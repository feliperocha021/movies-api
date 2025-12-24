export interface AccessTokenPayload {
  sub: string;
  username: string;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}
