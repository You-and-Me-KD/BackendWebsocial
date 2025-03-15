import { MongooseAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDocument } from './models';

@Injectable()
export class NotificationsRepository extends MongooseAbstractRepository<NotificationDocument> {
  protected readonly logger = new Logger(NotificationDocument.name);

  constructor(
    @InjectModel(NotificationDocument.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
  }
}
