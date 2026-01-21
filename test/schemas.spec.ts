import { MessageSchema } from '../src/modules/messages/schemas/message.schema';
import { OrderSchema } from '../src/modules/orders/schemas/order.schema';
import { ProductSchema } from '../src/modules/products/schemas/product.schema';

function hasIndex(schema, fields) {
  return schema.indexes().some(([indexFields]) =>
    JSON.stringify(indexFields) === JSON.stringify(fields),
  );
}

describe('Schema indexes', () => {
  it('defines product indexes', () => {
    expect(
      hasIndex(ProductSchema, { sellerId: 1, status: 1, createdAt: -1 }),
    ).toBe(true);
    expect(hasIndex(ProductSchema, { category: 1, status: 1 })).toBe(true);
    expect(
      hasIndex(ProductSchema, {
        title: 'text',
        description: 'text',
        tags: 'text',
      }),
    ).toBe(true);
  });

  it('defines order indexes', () => {
    expect(hasIndex(OrderSchema, { buyerId: 1, createdAt: -1 })).toBe(true);
    expect(hasIndex(OrderSchema, { sellerId: 1, createdAt: -1 })).toBe(true);
    expect(hasIndex(OrderSchema, { status: 1, createdAt: -1 })).toBe(true);
  });

  it('defines message indexes', () => {
    expect(hasIndex(MessageSchema, { conversationId: 1, createdAt: -1 })).toBe(
      true,
    );
    expect(
      hasIndex(MessageSchema, { senderId: 1, recipientId: 1, createdAt: -1 }),
    ).toBe(true);
  });
});
