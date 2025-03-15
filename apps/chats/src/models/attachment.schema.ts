import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'attachments', timestamps: true })
export class AttachmentDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.String })
  fileId: string;

  @Prop({ required: true, type: SchemaTypes.String })
  fileType: string;

  @Prop({ required: true, type: SchemaTypes.String })
  fileName: string;

  @Prop({ required: true, type: SchemaTypes.String })
  thumbnailURL: string;
}

export const AttachmentSchema =
  SchemaFactory.createForClass(AttachmentDocument);
