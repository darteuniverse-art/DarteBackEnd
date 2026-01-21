import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, trim: true })
  conversationId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  recipientId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  productId?: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Order' })
  orderId?: Types.ObjectId;

  @Prop({ required: true })
  body: string;

  @Prop({ type: [String], default: [] })
  attachments: string[];

  @Prop()
  readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
