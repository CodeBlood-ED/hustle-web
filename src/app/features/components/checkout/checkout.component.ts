import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { findProduct, getModelLabel, parsePrice, ProductItem } from '../landing/category/product-data';
import { CartEntry, CartService } from '../../../shared/services/cart.service';

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
  private readonly destroyRef = inject(DestroyRef);
  readonly cart = inject(CartService);

  product: ProductItem | null = null;
  isCartCheckout = false;
  model = '';
  modelLabel = '';
  quantity = 1;
  shippingMethod: ShippingMethod = 'standard';
  paymentMethod: PaymentMethod = 'card';
  orderMessage = '';

  ngOnInit(): void {
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
    this.orderMessage = form.valid
      ? 'Your details are ready. Secure payment processing must be connected before an order can be placed.'
      : 'Complete the required contact and delivery details to continue.';
  }

  private get price(): number {
    return parsePrice(this.product?.price ?? '');
  }
}

