import { Test, TestingModule } from '@nestjs/testing';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';

describe('AuthsController', () => {
  let authsController: AuthsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthsController],
      providers: [AuthsService],
    }).compile();

    authsController = app.get<AuthsController>(AuthsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authsController.getHello()).toBe('Hello World!');
    });
  });
});
