import { Routes } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LandingComponent } from './features/components/landing/landing.component';
import { HeroComponent } from './features/components/landing/hero/hero.component';
import { CategoryComponent } from './features/components/landing/category/category.component';
import { ProductCollectionComponent } from './features/components/landing/category/product-collection/product-collection.component';
import { ProductDetailComponent } from './features/components/landing/category/product-detail/product-detail.component';
import { NewArrivalsComponent } from './features/components/landing/new-arrivals/new-arrivals.component';

export const routes: Routes = [
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/components/cart-page/cart-page.component').then(
        (module) => module.CartPageComponent,
      ),
  },
  {
    path: '',
    component: LoaderComponent,
  },
  {
    path: 'checkout/cart',
    data: { cartCheckout: true },
    loadComponent: () =>
      import('./features/components/checkout/checkout.component').then(
        (module) => module.CheckoutComponent,
      ),
  },
  {
    path: 'checkout/:model/:productId',
    loadComponent: () =>
      import('./features/components/checkout/checkout.component').then(
        (module) => module.CheckoutComponent,
      ),
  },
  {
    path: 'landing',
    component: LandingComponent,
    children: [
      { path: '', component: HeroComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'categories/:model', component: ProductCollectionComponent },
      { path: 'categories/:model/:productId', component: ProductDetailComponent },
      { path: 'new-arrivals', component: NewArrivalsComponent },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/components/landing/contact/contact.component').then(
            (module) => module.ContactComponent,
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/components/landing/about/about.component').then(
            (module) => module.AboutComponent,
          ),
      },
    ]
  },
  { path: '**', redirectTo: 'landing' }
];
