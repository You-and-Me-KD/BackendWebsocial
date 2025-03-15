import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { CHAT_CONTENT_TYPE } from '../enums/chat.enum';
import { AttachmentDocument } from './attachment.schema';
import { DeliveryReceiptDocument } from './delivery-receipt.schema';
import { ReadReceiptDocument } from './read-receipt.schema';
import { ReactionDocument } from './reaction.schema';

@Schema({ collection: 'messages', timestamps: true })
export class MessageDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  chatId: string;

  @Prop({ required: true, type: SchemaTypes.String })
  content: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: Object.values(CHAT_CONTENT_TYPE),
    default: CHAT_CONTENT_TYPE.TEXT,
  })
  type: CHAT_CONTENT_TYPE;

  @Prop([AttachmentDocument])
  attachments: AttachmentDocument[];

  @Prop([DeliveryReceiptDocument])
  deliveryReceipts: DeliveryReceiptDocument[];

  @Prop([ReadReceiptDocument])
  readReceipts: ReadReceiptDocument[];

  @Prop([ReactionDocument])
  reactions: ReactionDocument[];

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  replyTo: string;

  @Prop({ required: true, type: SchemaTypes.Date })
  editedAt: Date;

  @Prop({ default: false, type: SchemaTypes.Boolean })
  isEdited: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(MessageDocument);
