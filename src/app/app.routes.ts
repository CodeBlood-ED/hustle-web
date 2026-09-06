import { Routes } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LandingComponent } from './features/components/landing/landing.component';
import { HeroComponent } from './features/components/landing/hero/hero.component';
import { CategoryComponent } from './features/components/landing/category/category.component';
import { NewArrivalsComponent } from './features/components/landing/new-arrivals/new-arrivals.component';
import { ContactComponent } from './features/components/landing/contact/contact.component';

export const routes: Routes = [
    {
        path:'',
        component: LoaderComponent
    },
    {
        path:'landing',
        component: LandingComponent,
        children: [
            {
                path:'',
                component: HeroComponent
            },
            {
                path:'categories',
                component: CategoryComponent
            },
            {
                path:'new-arrivals',
                component: NewArrivalsComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'about',
                component: ContactComponent
            }

        ]
    }
];
