import { Controller, Get, UseGuards } from '@nestjs/common';
import { KeycloakGuard } from './auth/guards/keycloak.guard';

// Define el controlador principal
@Controller()
export class AppController {
  // Endpoint público que no requiere autenticación
  @Get('public')
  getPublic() {
    return { message: 'This is a public endpoint' };
  }

  // Endpoint protegido que requiere autenticación con Keycloak
  @UseGuards(KeycloakGuard)
  @Get('protected')
  getProtected() {
    return { message: 'This is a protected endpoint' };
  }
}