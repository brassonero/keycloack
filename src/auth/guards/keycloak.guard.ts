import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class KeycloakGuard extends AuthGuard('keycloak') {
  private readonly logger = new Logger(KeycloakGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.debug('Headers:', request.headers);
    this.logger.debug('Authorization header:', request.headers.authorization);

    try {
      const result = await super.canActivate(context);
      return result as boolean;
    } catch (error) {
      this.logger.error('Authentication error:', error);
      throw error;
    }
  }

  handleRequest(err: any, user: any, info: any, context: any) {
    this.logger.debug('Handle request - Error:', err);
    this.logger.debug('Handle request - User:', user);
    this.logger.debug('Handle request - Info:', info);

    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token or no token provided');
    }
    return user;
  }
}