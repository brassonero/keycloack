import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import {KeycloakStrategy} from "./strategies/keycloak.strategy";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "./auth.controller";

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'keycloak' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KeycloakStrategy],
  exports: [AuthService]
})
export class AuthModule {}