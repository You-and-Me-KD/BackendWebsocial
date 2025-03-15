import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NOTIFICATION_TEMPLATE_ENUM } from '../enums';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'notification_templates', timestamps: true })
export class NotificationTemplateDocument extends AbstractDocument {
  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: Object.values(NOTIFICATION_TEMPLATE_ENUM),
  })
  type: NOTIFICATION_TEMPLATE_ENUM;

  @Prop({ required: true, type: SchemaTypes.String })
  language: string;

  @Prop({ required: true, type: SchemaTypes.String })
  title: string;

  @Prop({ required: true, type: SchemaTypes.String })
  content: string;
}

export const NotificationTemplateSchema = SchemaFactory.createForClass(
  NotificationTemplateDocument,
);
