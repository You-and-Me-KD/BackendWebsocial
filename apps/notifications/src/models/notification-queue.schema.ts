import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'notification_queue', timestamps: true })
export class NotificationQueueDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: string; // Người nhận

  @Prop({ required: true })
  type: string; // Loại thông báo

  @Prop({ required: true })
  message: string; // Nội dung thông báo

  @Prop({ default: false })
  isProcessed: boolean; // Đã xử lý hay chưa
}

export const NotificationQueueSchema = SchemaFactory.createForClass(
  NotificationQueueDocument,
);
