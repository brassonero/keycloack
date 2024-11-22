import { SetMetadata } from '@nestjs/common';

// Define una clave constante para almacenar los roles en los metadatos
export const ROLES_KEY = 'roles';

// Define el decorador Roles que acepta una lista variable de roles como strings
// Este decorador se puede usar como @Roles('admin', 'user')
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);