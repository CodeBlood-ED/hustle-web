import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../../shared/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  private readonly cart = inject(CartService);
  @Input() productId = 0;
  @Input() name = 'Clear Shield Case';
  @Input() description = 'Slim, protective, and camera-safe.';
  @Input() price = '$39';
  @Input() tag = 'New';
  @Input() accent = '#0d917e';
  @Input() colors: string[] = ['#0d917e', '#fac5d2', '#1f2937'];
  @Input() detailLink = '/landing/categories/iphone-13/1';
  @Input() model = 'iphone-13';

  addToCart(event: MouseEvent): void {
    event.stopPropagation();
    this.cart.addProduct({
      id: this.productId,
      name: this.name,
      price: this.price,
      accent: this.accent,
    }, this.model);
  }
}
