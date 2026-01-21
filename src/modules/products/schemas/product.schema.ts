import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type ProductDocument = Product & Document;

export enum ProductStatus {
  Draft = 'draft',
  Active = 'active',
  Inactive = 'inactive',
  Archived = 'archived',
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Seller', required: true })
  sellerId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ trim: true })
  category?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ enum: ProductStatus, default: ProductStatus.Draft })
  status: ProductStatus;

  @Prop({ min: 0, default: 0 })
  inventoryCount: number;

  @Prop({ min: 0, max: 5, default: 0 })
  ratingAverage: number;

  @Prop({ min: 0, default: 0 })
  ratingCount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ sellerId: 1, status: 1, createdAt: -1 });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ title: 'text', description: 'text', tags: 'text' });
