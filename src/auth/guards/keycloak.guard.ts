import {
  Injectable,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class KeycloakGuard extends AuthGuard('keycloak') {
  private readonly logger = new Logger(KeycloakGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    this.logger.debug('Auth header:', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Invalid authorization header format. Must start with "Bearer "',
      );
    }

    try {
      const result = await super.canActivate(context);
      return result as boolean;
    } catch (error) {
      this.logger.error('Authentication error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  handleRequest(err: any, user: any, info: any) {
    this.logger.debug('Handle request - Error:', err);
    this.logger.debug('Handle request - User:', user);
    this.logger.debug('Handle request - Info:', info);

    if (err || !user) {
      throw new UnauthorizedException('Authentication failed');
    }

    return user;
  }
}
