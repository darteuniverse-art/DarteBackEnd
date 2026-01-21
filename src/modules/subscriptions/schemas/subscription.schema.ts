import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

export enum SubscriptionStatus {
  Active = 'active',
  Inactive = 'inactive',
  Canceled = 'canceled',
  PastDue = 'past_due',
}

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Seller', required: true })
  sellerId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  plan: string;

  @Prop({ enum: SubscriptionStatus, default: SubscriptionStatus.Active })
  status: SubscriptionStatus;

  @Prop()
  startedAt?: Date;

  @Prop()
  renewalDate?: Date;

  @Prop({ trim: true })
  paymentRef?: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
