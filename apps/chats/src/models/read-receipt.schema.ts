import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'read_receipts', timestamps: true })
export class ReadReceiptDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.String })
  userId: string;

  @Prop({ required: true, type: SchemaTypes.Date })
  readAt: Date;
}

export const ReadReceiptSchema =
  SchemaFactory.createForClass(ReadReceiptDocument);
