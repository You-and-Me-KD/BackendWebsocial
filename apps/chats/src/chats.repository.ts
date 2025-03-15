import { MongooseAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ChatDocument } from './models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatsRepository extends MongooseAbstractRepository<ChatDocument> {
  protected readonly logger = new Logger(ChatDocument.name);

  constructor(
    @InjectModel(ChatDocument.name)
    private readonly chatModel: Model<ChatDocument>,
  ) {
    super(chatModel);
  }
}
