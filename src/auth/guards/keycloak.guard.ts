import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
// Importa el guard base de Passport
import { AuthGuard } from '@nestjs/passport';

// Define el guard como un servicio inyectable que extiende el AuthGuard de Keycloak
@Injectable()
export class KeycloakGuard extends AuthGuard('keycloak') {
  // Inicializa un logger específico para este guard
  private readonly logger = new Logger(KeycloakGuard.name);

  // Método que verifica si la petición puede activar el endpoint
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtiene el objeto request del contexto HTTP
    const request = context.switchToHttp().getRequest();
    // Extrae el header de autorización
    const authHeader = request.headers.authorization;

    // Registra el header de autorización para debugging
    this.logger.debug('Auth header:', authHeader);

    // Verifica si existe el header de autorización
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    // Verifica si el header tiene el formato correcto (Bearer token)
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header format. Must start with "Bearer "');
    }

    try {
      // Intenta activar el guard padre (AuthGuard de Keycloak)
      const result = await super.canActivate(context);
      return result as boolean;
    } catch (error) {
      // Registra cualquier error de autenticación
      this.logger.error('Authentication error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Método que maneja la respuesta de la autenticación
  handleRequest(err: any, user: any, info: any) {
    // Registra información de debugging
    this.logger.debug('Handle request - Error:', err);
    this.logger.debug('Handle request - User:', user);
    this.logger.debug('Handle request - Info:', info);

    // Si hay error o no hay usuario, lanza una excepción
    if (err || !user) {
      throw new UnauthorizedException('Authentication failed');
    }

    // Retorna el usuario autenticado
    return user;
  }
}