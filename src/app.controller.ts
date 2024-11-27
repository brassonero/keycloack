import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async getToken() {
    return this.authService.getToken();
  }

  @Get('public')
  getPublic() {
    return { message: 'This is a public endpoint' };
  }
}
