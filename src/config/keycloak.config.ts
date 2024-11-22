import { registerAs } from '@nestjs/config';

// Exporta la configuración de Keycloak como un proveedor de configuración nombrado
export const keycloakConfig = registerAs('keycloak', () => ({
  // Configuración del Reino (Realm)
  // Define el nombre del reino de Keycloak, usa 'nest-auth' como valor predeterminado
  realm: process.env.KEYCLOAK_REALM || 'nest-auth',
  // URL del servidor de autenticación de Keycloak
  authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080',

  // Configuración del Cliente
  // ID del cliente en Keycloak
  resource: process.env.KEYCLOAK_CLIENT_ID || 'nest-auth-client',
  // Secreto del cliente para autenticación segura
  secret: process.env.KEYCLOAK_CLIENT_SECRET,
  // Clave pública para verificar tokens
  publicKey: process.env.KEYCLOAK_PUBLIC_KEY,

  // Configuración de Seguridad
  // Requiere SSL solo para conexiones externas
  sslRequired: 'external',
  // Puerto para comunicaciones confidenciales (0 significa que no se usa)
  confidentialPort: 0,
  // Indica que este cliente solo acepta tokens Bearer
  bearerOnly: true,

  // Configuración de Autenticación
  // False indica que es un cliente confidencial que usa secreto
  publicClient: false,
  // Habilita la verificación de la audiencia del token
  verifyTokenAudience: true,

  // Configuración de Tokens
  // Utiliza mapeo de roles desde el recurso
  useResourceRoleMappings: true,
  // Credenciales del cliente
  credentials: {
    // Secreto del cliente (repetido para compatibilidad con Keycloak)
    secret: process.env.KEYCLOAK_CLIENT_SECRET
  }
}));

// Exporta la configuración como valor por defecto
export default keycloakConfig;