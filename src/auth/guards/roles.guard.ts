import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// Importa Reflector para acceder a los metadatos
import { Reflector } from '@nestjs/core';
// Importa la clave de roles definida en el decorador
import { ROLES_KEY } from '../decorators/roles.decorator';

// Define el guard de roles como servicio inyectable
@Injectable()
export class RolesGuard implements CanActivate {
  // Inyecta el servicio Reflector en el constructor
  constructor(private reflector: Reflector) {}

  // Método que verifica si el usuario tiene los roles requeridos
  canActivate(context: ExecutionContext): boolean {
    // Obtiene los roles requeridos de los metadatos del handler y la clase
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay roles requeridos, permite el acceso
    if (!requiredRoles) {
      return true;
    }

    // Obtiene el usuario de la request
    const { user } = context.switchToHttp().getRequest();
    // Verifica si el usuario tiene al menos uno de los roles requeridos
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}