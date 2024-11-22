import { Injectable, Logger } from '@nestjs/common';
// Importa la clase base para estrategias de Passport
import { PassportStrategy } from '@nestjs/passport';
// Importa la estrategia JWT y utilidades de passport-jwt
import { ExtractJwt, Strategy } from 'passport-jwt';
// Importa el servicio de configuración
import { ConfigService } from '@nestjs/config';

// Define la estrategia como un servicio inyectable
@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  // Inicializa un logger específico para esta estrategia
  private readonly logger = new Logger(KeycloakStrategy.name);

  constructor(private configService: ConfigService) {
    // Obtiene la clave pública de Keycloak desde la configuración
    const keycloakPublicKey = configService.get<string>('keycloak.publicKey');
    // Formatea la clave pública en formato PEM
    const formattedKey = `-----BEGIN PUBLIC KEY-----\n${keycloakPublicKey}\n-----END PUBLIC KEY-----`;

    // Configura la estrategia JWT con las opciones necesarias
    super({
      // Extrae el token JWT del header Authorization
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // No ignora la expiración del token
      ignoreExpiration: false,
      // Usa la clave pública formateada para verificar la firma
      secretOrKey: formattedKey,
      // Especifica el algoritmo de firma RS256 (RSA + SHA256)
      algorithms: ['RS256'],
      // Configura el emisor esperado del token (URL del realm de Keycloak)
      issuer: `${configService.get<string>('keycloak.authServerUrl')}/realms/${configService.get<string>('keycloak.realm')}`,
      // Configura la audiencia esperada (ID del cliente)
      audience: configService.get<string>('keycloak.resource'),
    });

    // Registra la inicialización exitosa
    this.logger.debug('KeycloakStrategy initialized');
  }

  // Método para validar y transformar el payload del token JWT
  async validate(payload: any) {
    // Registra el payload para debugging
    this.logger.debug('Validating JWT payload', payload);

    // Retorna un objeto con la información relevante del usuario
    return {
      // ID del usuario desde el claim 'sub'
      userId: payload.sub,
      // Nombre de usuario desde el claim 'preferred_username'
      username: payload.preferred_username,
      // Roles del reino, si existen, o array vacío
      roles: payload.realm_access?.roles || [],
      // Email del usuario
      email: payload.email,
    };
  }
}