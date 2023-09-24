
export const oktaConfig = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  issuer: import.meta.env.VITE_ISSUER,
  redirectUri: import.meta.env.VITE_REDIRECTURI,
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck:true,
};
