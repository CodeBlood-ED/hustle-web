import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../category/product-card/product-card.component';
import { CatalogProduct, listNewArrivals } from '../category/product-data';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.scss'
})
export class NewArrivalsComponent {
  products: CatalogProduct[] = listNewArrivals();
}
