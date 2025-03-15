import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'reactions', timestamps: true })
export class ReactionDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: string;

  @Prop({ required: true, type: SchemaTypes.String })
  type: string;
}

export const ReactionSchema = SchemaFactory.createForClass(ReactionDocument);
