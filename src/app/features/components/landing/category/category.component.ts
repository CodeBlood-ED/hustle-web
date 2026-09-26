import { Component } from '@angular/core';
import { CategoryCardComponent } from './category-card/category-card.component';
import { listCategories } from './product-data';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categories = listCategories();
}
