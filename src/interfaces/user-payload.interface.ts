export interface AccessTokenPayload {
  sub: string;
  username: string;
  role: "user" | "admin" | "superadmin";
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}
