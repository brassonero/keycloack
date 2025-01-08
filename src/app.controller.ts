import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { KeycloakGuard } from './auth/guards/keycloak.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('public')
  getPublic() {
    return { message: 'This is a public endpoint' };
  }

  @Get('token')
  async getToken() {
    return this.authService.getToken();
  }

  @UseGuards(KeycloakGuard)
  @Get('protected')
  getProtected() {
    return { message: 'Protected endpoint accessed successfully' };
  }
}
