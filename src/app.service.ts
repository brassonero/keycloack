import { Injectable } from '@nestjs/common';

// Define el servicio principal como inyectable
@Injectable()
export class AppService {
  // Método que retorna un saludo
  getHello(): string {
    return 'Hello World!';
  }
}