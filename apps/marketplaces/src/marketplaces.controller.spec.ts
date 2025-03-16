import { Test, TestingModule } from '@nestjs/testing';
import { MarketplacesController } from './marketplaces.controller';
import { MarketplacesService } from './marketplaces.service';

describe('MarketplaceController', () => {
  let marketplacesController: MarketplacesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MarketplacesController],
      providers: [MarketplacesService],
    }).compile();

    marketplacesController = app.get<MarketplacesController>(
      MarketplacesController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(marketplacesController.getHello()).toBe('Hello World!');
    });
  });
});
