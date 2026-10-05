import { CurrencyPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { findProduct, getModelLabel, parsePrice, ProductItem } from '../landing/category/product-data';
import { CartEntry, CartService } from '../../../shared/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { OrderApiService } from '../../../core/services/order-api.service';
import { ProductApiService } from '../../../core/services/product-api.service';
import { CreateOrderRequest, OrderDto } from '../../../core/models/order.model';

type ShippingMethod = 'standard' | 'express';
type PaymentMethod = 'card' | 'paypal' | 'apple-pay';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly cart = inject(CartService);
  readonly authService = inject(AuthService);
  private readonly orderApi = inject(OrderApiService);
  private readonly productApi = inject(ProductApiService);

  product: ProductItem | null = null;
  isCartCheckout = false;
  model = '';
  modelLabel = '';
  quantity = 1;
  shippingMethod: ShippingMethod = 'standard';
  paymentMethod: PaymentMethod = 'card';
  orderMessage = '';
  isSubmitting = false;

  // Order submission result
  orderPlaced = false;
  placedOrder: OrderDto | null = null;

  // Customer form fields
  customerEmail = '';
  customerName = '';
  customerPhone = '';
  streetAddress = '';
  city = '';
  postalCode = '';
  country = 'India';

  isLoggedIn = computed(() => this.authService.isLoggedIn());

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.customerEmail = user.email || '';
      this.customerName = user.name || '';
      this.customerPhone = user.contact || '';
    }

    combineLatest([this.route.paramMap, this.route.data])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([params, data]) => {
      this.isCartCheckout = data['cartCheckout'] === true
        || params.get('model') === 'cart';

      if (this.isCartCheckout) {
        this.product = null;
        this.model = '';
        this.modelLabel = 'Your cart';
        return;
      }

      this.model = (params.get('model') ?? '').toLowerCase();
      const productId = Number(params.get('productId'));
      this.product = Number.isFinite(productId) ? findProduct(this.model, productId) : null;
      this.modelLabel = getModelLabel(this.model);
      this.quantity = 1;
      this.orderMessage = '';

      if (!this.product && Number.isFinite(productId) && productId > 0) {
        this.productApi.getProductById(productId).subscribe({
          next: (p) => {
            if (p) {
              this.product = {
                id: p.id,
                name: p.title,
                description: p.description || `${p.category} protective case`,
                price: p.netPrice || `${p.numericPrice || 499}/-`,
                tag: p.tag || 'Popular',
                accent: p.accent || '#0d917e',
                colors: p.colors && p.colors.length > 0 ? p.colors : ['#0d917e', '#fac5d2', '#1f2937'],
                materials: p.materials || ['TPU shell'],
                features: p.features || ['Drop-tested']
              };
            }
          }
        });
      }
    });
  }

  get subtotal(): number {
    return this.isCartCheckout ? this.cart.subtotal() : this.price * this.quantity;
  }

  get itemCount(): number {
    return this.isCartCheckout ? this.cart.itemCount() : this.quantity;
  }

  get shippingCost(): number {
    if (this.shippingMethod === 'express') return 99;
    return this.subtotal >= 999 ? 0 : 49;
  }

  get estimatedTax(): number {
    return Math.round(this.subtotal * 0.18);
  }

  get total(): number {
    return this.subtotal + this.shippingCost + this.estimatedTax;
  }

  updateQuantity(change: number): void {
    this.quantity = Math.max(1, this.quantity + change);
    this.orderMessage = '';
  }

  updateCartQuantity(entry: CartEntry, change: number): void {
    if (change < 0 && entry.quantity <= 1) return;
    if (change < 0) {
      this.cart.decrement(entry.id, entry.model);
    } else {
      this.cart.increment(entry.id, entry.model);
    }
  }

  submitOrder(form: NgForm): void {
    if (!this.authService.isLoggedIn()) {
      this.orderMessage = 'Please sign in or create an account to place an order.';
      return;
    }

    if (!form.valid) {
      this.orderMessage = 'Complete the required contact and delivery details to continue.';
      return;
    }

    this.isSubmitting = true;
    this.orderMessage = '';

    const req: CreateOrderRequest = {
      customerName: this.customerName.trim(),
      customerEmail: this.customerEmail.trim(),
      customerPhone: this.customerPhone.trim() || '9876543210',
      shippingAddress: this.streetAddress.trim(),
      city: this.city.trim(),
      postalCode: this.postalCode.trim(),
      shippingMethod: this.shippingMethod,
      paymentMethod: this.paymentMethod,
      fromCart: false,
      items: this.isCartCheckout
        ? this.cart.entries().map(e => ({ productId: e.id, model: e.model, quantity: e.quantity }))
        : this.product
          ? [{ productId: this.product.id, model: this.model, quantity: this.quantity }]
          : []
    };

    this.orderApi.createOrder(req).subscribe({
      next: (order) => {
        this.isSubmitting = false;
        this.orderPlaced = true;
        this.placedOrder = order;
        if (this.isCartCheckout) {
          this.cart.clear();
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.orderMessage = err?.error?.message || 'Failed to place order. Please check your details and try again.';
      }
    });
  }

  private get price(): number {
    return parsePrice(this.product?.price ?? '');
  }
}
