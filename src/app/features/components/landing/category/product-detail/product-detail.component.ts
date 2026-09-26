import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogProduct, findProduct, getModelLabel, resolveCatalogModel } from '../product-data';
import { CartService } from '../../../../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  product: CatalogProduct | null = null;
  modelName = '';
  modelLabel = 'iPhone';

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const model = resolveCatalogModel(params.get('model')) ?? '';
      const productId = Number(params.get('productId'));
      this.modelName = model;
      this.modelLabel = getModelLabel(model);
      this.product = model && Number.isFinite(productId) ? findProduct(model, productId) : null;
    });
  }

  addToCart(): void {
    if (!this.product) return;

    this.cart.addProduct({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      accent: this.product.accent,
    }, this.product.model);
  }

  buyNow(): void {
    if (!this.product) return;
    void this.router.navigate(['/checkout', this.product.model, this.product.id]);
  }
}
