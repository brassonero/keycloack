import { registerAs } from '@nestjs/config';

export const keycloakConfig = registerAs('keycloak', () => ({
  realm: process.env.KEYCLOAK_REALM || 'your-realm',
  authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080',
  sslRequired: 'external',
  resource: process.env.KEYCLOAK_CLIENT_ID || 'your-client-id',
  publicClient: true,
  confidentialPort: 0,
  bearerOnly: true,
}));

export default keycloakConfig;