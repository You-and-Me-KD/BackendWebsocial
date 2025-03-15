import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'delivery_receipts', timestamps: true })
// Schema for delivery receipt. (who received the message)
export class DeliveryReceiptDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: string;

  @Prop({ required: true, type: SchemaTypes.Date })
  deliveredAt: Date;
}

export const DeliveryReceiptSchema = SchemaFactory.createForClass(
  DeliveryReceiptDocument,
);
