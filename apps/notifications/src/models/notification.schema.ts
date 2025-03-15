import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPE_ENUM,
} from '../enums/notification.enum';

@Schema({ collection: 'notifications', timestamps: true })
export class NotificationDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: Object.values(NOTIFICATION_TYPE_ENUM),
  })
  type: NOTIFICATION_TYPE_ENUM;

  @Prop({ required: true, type: SchemaTypes.String })
  title: string;

  @Prop({ required: true, type: SchemaTypes.String })
  content: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: Object.values(NOTIFICATION_STATUS_ENUM),
    default: NOTIFICATION_STATUS_ENUM.UNREAD,
  })
  status: NOTIFICATION_STATUS_ENUM;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationDocument);
