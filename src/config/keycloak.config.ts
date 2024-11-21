import { registerAs } from '@nestjs/config';

export const keycloakConfig = registerAs('keycloak', () => ({
  // Realm settings
  realm: process.env.KEYCLOAK_REALM || 'nest-auth',
  authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080',

  // Client settings
  resource: process.env.KEYCLOAK_CLIENT_ID || 'nest-auth-client',
  secret: process.env.KEYCLOAK_CLIENT_SECRET,
  publicKey: process.env.KEYCLOAK_PUBLIC_KEY,

  // Security settings
  sslRequired: 'external',
  confidentialPort: 0,
  bearerOnly: true,

  // Authentication settings
  publicClient: false,  // Changed to false since we're using client secret
  verifyTokenAudience: true,

  // Token settings
  useResourceRoleMappings: true,
  credentials: {
    secret: process.env.KEYCLOAK_CLIENT_SECRET
  }
}));

export default keycloakConfig;