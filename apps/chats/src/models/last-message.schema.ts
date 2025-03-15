import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'last_messages', timestamps: true })
export class LastMessageDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  senderId: string;

  @Prop({ required: true, type: SchemaTypes.String })
  content: string;

  @Prop({ required: true, type: SchemaTypes.Date })
  sentAt: Date;

  @Prop({ required: true, type: SchemaTypes.String })
  type: string;
}

export const LastMessageSchema =
  SchemaFactory.createForClass(LastMessageDocument);
