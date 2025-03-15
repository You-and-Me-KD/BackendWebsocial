import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'notifications_settings', timestamps: true })
export class NotificationSettingsDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: string; // ID người dùng

  @Prop({ type: Boolean, default: true })
  enableLikes: boolean; // Bật/tắt thông báo khi ai đó like

  @Prop({ type: Boolean, default: true })
  enableComments: boolean; // Bật/tắt thông báo khi có comment

  @Prop({ type: Boolean, default: true })
  enableFollows: boolean; // Bật/tắt thông báo khi có follow
}

export const NotificationSettingsSchema = SchemaFactory.createForClass(
  NotificationSettingsDocument,
);
