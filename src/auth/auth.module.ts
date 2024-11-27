import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import {KeycloakStrategy} from "./strategies/keycloak.strategy";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'keycloak' }),
  ],
  providers: [AuthService, KeycloakStrategy],
  exports: [AuthService]
})
export class AuthModule {}