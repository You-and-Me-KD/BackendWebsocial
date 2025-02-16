import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema()
export abstract class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ type: SchemaTypes.Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date, default: Date.now })
  updatedAt: Date;
}
