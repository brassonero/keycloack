import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';  // Updated import
import keycloakConfig from './config/keycloak.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [keycloakConfig],
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}