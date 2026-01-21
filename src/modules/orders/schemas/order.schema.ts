import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  Pending = 'pending',
  Paid = 'paid',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Canceled = 'canceled',
}

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  unitPrice: number;
}

@Schema({ _id: false })
export class RevenueSplit {
  @Prop({ required: true, min: 0 })
  sellerAmount: number;

  @Prop({ required: true, min: 0 })
  adminAmount: number;
}

@Schema({ _id: false })
export class ShippingAddress {
  @Prop({ trim: true })
  fullName?: string;

  @Prop({ trim: true })
  line1?: string;

  @Prop({ trim: true })
  line2?: string;

  @Prop({ trim: true })
  city?: string;

  @Prop({ trim: true })
  state?: string;

  @Prop({ trim: true })
  postalCode?: string;

  @Prop({ trim: true })
  country?: string;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  buyerId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Seller', required: true })
  sellerId: Types.ObjectId;

  @Prop({ type: [OrderItem], default: [] })
  items: OrderItem[];

  @Prop({ required: true, min: 0 })
  totalAmount: number;

  @Prop({ enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Prop({ trim: true })
  paymentId?: string;

  @Prop({ type: RevenueSplit })
  revenueSplit?: RevenueSplit;

  @Prop({ type: ShippingAddress })
  shippingAddress?: ShippingAddress;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ buyerId: 1, createdAt: -1 });
OrderSchema.index({ sellerId: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
