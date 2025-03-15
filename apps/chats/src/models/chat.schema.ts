import { AbstractDocument } from '@app/common/database/mongoose/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { CHAT_TYPE } from '../enums/chat.enum';
import { ChatMemberDocument } from './chat-member.schema';
import { LastMessageDocument } from './last-message.schema';

@Schema({ collection: 'chats' })
export class ChatDocument extends AbstractDocument {
  @Prop({
    required: true,
    type: SchemaTypes.String,
    enum: Object.values(CHAT_TYPE),
    default: CHAT_TYPE.DIRECT,
  })
  type: CHAT_TYPE;

  @Prop({ required: true, type: SchemaTypes.String })
  name: string;

  @Prop({ type: SchemaTypes.String })
  avatarId: string;

  @Prop([ChatMemberDocument])
  member: ChatMemberDocument[];

  @Prop({ type: LastMessageDocument })
  lastMessage: LastMessageDocument;
}

export const ChatSchema = SchemaFactory.createForClass(ChatDocument);
