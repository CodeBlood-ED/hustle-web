import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getCollectionTitle, getProducts, ProductItem, resolveCatalogModel } from '../product-data';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductApiService } from '../../../../../core/services/product-api.service';

@Component({
  selector: 'app-product-collection',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './product-collection.component.html',
  styleUrl: './product-collection.component.scss'
})
export class ProductCollectionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly productApi = inject(ProductApiService);

  selectedModelLabel = 'iPhone 13 Cases';
  currentModel = 'iphone-13';
  products: ProductItem[] = [];
  hasModel = true;

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const model = resolveCatalogModel(params.get('model'));
      this.hasModel = Boolean(model);
      this.currentModel = model ?? '';
      this.selectedModelLabel = model ? getCollectionTitle(model) : 'iPhone Cases';
      this.products = model ? getProducts(model) : [];

      if (model) {
        this.productApi.getProducts(model).subscribe({
          next: (apiProducts) => {
            if (apiProducts && apiProducts.length > 0) {
              this.products = apiProducts.map(p => ({
                id: p.id,
                name: p.title,
                description: p.description || `${this.selectedModelLabel} protective cover`,
                price: p.netPrice || `${p.numericPrice || 499}/-`,
                tag: p.tag || 'Popular',
                accent: p.accent || '#0d917e',
                colors: p.colors && p.colors.length > 0 ? p.colors : ['#0d917e', '#fac5d2', '#1f2937'],
                materials: p.materials && p.materials.length > 0 ? p.materials : ['TPU shell'],
                features: p.features && p.features.length > 0 ? p.features : ['Drop-tested']
              }));
            }
          },
          error: () => {
            // Keep default static catalog on error
          }
        });
      }
    });
  }
}
