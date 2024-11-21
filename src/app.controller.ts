import { Controller, Get, UseGuards } from '@nestjs/common';
import { KeycloakGuard } from './auth/guards/keycloak.guard';

@Controller()
export class AppController {
  @Get('public')
  getPublic() {
    return { message: 'This is a public endpoint' };
  }

  @UseGuards(KeycloakGuard)
  @Get('protected')
  getProtected() {
    return { message: 'This is a protected endpoint' };
  }
}