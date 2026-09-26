import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getCollectionTitle, getProducts, ProductItem, resolveCatalogModel } from '../product-data';
import { ProductCardComponent } from '../product-card/product-card.component';

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
    });
  }
}
