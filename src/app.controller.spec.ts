import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Define el grupo de pruebas para AppController
describe('AppController', () => {
  // Declara una variable para el controlador
  let appController: AppController;

  // Antes de cada prueba, configura el módulo de testing
  beforeEach(async () => {
    // Crea un módulo de prueba con los componentes necesarios
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // Obtiene una instancia del controlador
    appController = app.get<AppController>(AppController);
  });

  // Define las pruebas para el endpoint raíz
  describe('root', () => {
    // Prueba que verifica si retorna "Hello World!"
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});