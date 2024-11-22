import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Función asíncrona para iniciar la aplicación
async function bootstrap() {
  // Crea una nueva instancia de la aplicación NestJS
  const app = await NestFactory.create(AppModule);
  // Inicia el servidor en el puerto especificado o 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);
}
// Ejecuta la función de inicio
bootstrap();