import { Test, TestingModule } from '@nestjs/testing';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';

describe('SocialsController', () => {
  let socialsController: SocialsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SocialsController],
      providers: [SocialsService],
    }).compile();

    socialsController = app.get<SocialsController>(SocialsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(socialsController.getHello()).toBe('Hello World!');
    });
  });
});
