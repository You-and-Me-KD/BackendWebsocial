import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { CHAT_MEMBER_ROLE } from '../enums';

@Schema({ collection: 'chat_members' })
export class ChatMemberDocument extends AbstractDocument {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    default: CHAT_MEMBER_ROLE.MEMBER,
    enum: Object.values(CHAT_MEMBER_ROLE),
  })
  role: CHAT_MEMBER_ROLE;

  @Prop({ type: SchemaTypes.Date })
  lastSeen: Date;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  chatId: string;

  @Prop({ required: true, type: SchemaTypes.Date, default: Date.now })
  joinedAt: Date;
}

export const ChatMemberSchema =
  SchemaFactory.createForClass(ChatMemberDocument);
