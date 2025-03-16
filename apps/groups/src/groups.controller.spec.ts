import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

describe('GroupsController', () => {
  let groupsController: GroupsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService],
    }).compile();

    groupsController = app.get<GroupsController>(GroupsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(groupsController.getHello()).toBe('Hello World!');
    });
  });
});
