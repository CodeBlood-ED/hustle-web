import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  @Input() title = 'iPhone 13';
  @Input() subtitle = 'Daily essentials';
  @Input() count = 6;
  @Input() accent = '#0d917e';
  @Input() productPath = '/landing/categories/iphone-13';
}
