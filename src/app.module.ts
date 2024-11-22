import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import keycloakConfig from './config/keycloak.config';

// Define el módulo principal de la aplicación
@Module({
  // Configura los módulos importados
  imports: [
    // Configura el módulo de configuración como global
    ConfigModule.forRoot({
      isGlobal: true,
      load: [keycloakConfig],
    }),
    // Importa el módulo de autenticación
    AuthModule,
  ],
  // Registra los controladores
  controllers: [AppController],
})
export class AppModule {}