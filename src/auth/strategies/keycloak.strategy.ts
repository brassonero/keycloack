import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  private readonly logger = new Logger(KeycloakStrategy.name);

  constructor(private configService: ConfigService) {
    const keycloakPublicKey = configService.get<string>('keycloak.publicKey');
    const formattedKey = `-----BEGIN PUBLIC KEY-----\n${keycloakPublicKey}\n-----END PUBLIC KEY-----`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: formattedKey,
      algorithms: ['RS256'],
      issuer: `${configService.get<string>('keycloak.authServerUrl')}/realms/${configService.get<string>('keycloak.realm')}`,
      audience: configService.get<string>('keycloak.resource'),
    });

    this.logger.debug('KeycloakStrategy initialized');
  }

  async validate(payload: any) {
    this.logger.debug('Validating JWT payload', payload);

    return {
      userId: payload.sub,
      username: payload.preferred_username,
      roles: payload.realm_access?.roles || [],
      email: payload.email,
    };
  }
}