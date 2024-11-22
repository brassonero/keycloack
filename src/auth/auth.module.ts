import { Module } from '@nestjs/common';
// Importa PassportModule para la integración con Passport.js
import { PassportModule } from '@nestjs/passport';
// Importa la estrategia personalizada de Keycloak
import { KeycloakStrategy } from './strategies/keycloak.strategy';
// Importa ConfigModule para acceder a la configuración
import { ConfigModule } from '@nestjs/config';

// Define el módulo de autenticación
@Module({
  imports: [
    // Registra PassportModule con Keycloak como estrategia predeterminada
    PassportModule.register({ defaultStrategy: 'keycloak' }),
    // Importa ConfigModule para acceder a las variables de configuración
    ConfigModule,
  ],
  // Proporciona la estrategia de Keycloak como un servicio
  providers: [KeycloakStrategy],
  // Exporta PassportModule para que otros módulos puedan usar la autenticación
  exports: [PassportModule],
})
export class AuthModule {}