import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SellerDocument = Seller & Document;

export enum SellerStatus {
  Pending = 'pending',
  Active = 'active',
  Inactive = 'inactive',
  Suspended = 'suspended',
  Rejected = 'rejected',
}

@Schema({ timestamps: true })
export class Seller {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  businessName: string;

  @Prop({ trim: true })
  businessAddress?: string;

  @Prop({ enum: SellerStatus, default: SellerStatus.Pending })
  status: SellerStatus;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Subscription' })
  subscriptionId?: Types.ObjectId;

  @Prop({ type: Object })
  payoutProfile?: Record<string, unknown>;

  @Prop()
  approvedAt?: Date;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
