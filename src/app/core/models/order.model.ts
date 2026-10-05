export interface OrderItemRequest {
  productId: number;
  model: string;
  quantity: number;
}

export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city?: string;
  state?: string;
  postalCode?: string;
  shippingMethod?: 'standard' | 'express';
  paymentMethod?: 'card' | 'paypal' | 'apple-pay' | 'cod';
  items?: OrderItemRequest[];
  fromCart?: boolean;
}

export interface OrderItemDto {
  id: number;
  productId: number;
  productTitle: string;
  model: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  imageUrl?: string;
}

export interface OrderDto {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city?: string;
  state?: string;
  postalCode?: string;
  shippingMethod: 'STANDARD' | 'EXPRESS';
  paymentMethod: 'CARD' | 'PAYPAL' | 'APPLE_PAY' | 'COD';
  shippingCost: number;
  taxAmount: number;
  subtotal: number;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  items: OrderItemDto[];
  createdAt: string;
}
