export const JwtSecrets = {
  access: `${process.env.JWT_SECRET}${process.env.JWT_ACCESS_SALT}`,
  refresh: `${process.env.JWT_SECRET}${process.env.JWT_REFRESH_SALT}`,
  invite_token: `${process.env.JWT_SECRET}${process.env.JWT_INVITE_TOKEN_SALT}`,
} as const;
