import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogProduct, findProduct, getModelLabel, resolveCatalogModel } from '../product-data';
import { CartService } from '../../../../../shared/services/cart.service';
import { ProductApiService } from '../../../../../core/services/product-api.service';

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
  private readonly productApi = inject(ProductApiService);

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
                materials: p.materials && p.materials.length > 0 ? p.materials : ['TPU shell'],
                features: p.features && p.features.length > 0 ? p.features : ['Drop-tested'],
                model: p.category,
                modelLabel: getModelLabel(p.category)
              };
            }
          }
        });
      }
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
