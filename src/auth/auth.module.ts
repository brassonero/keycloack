import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakStrategy } from './strategies/keycloak.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'keycloak' }),
    ConfigModule,
  ],
  providers: [KeycloakStrategy],
  exports: [PassportModule],
})
export class AuthModule {}