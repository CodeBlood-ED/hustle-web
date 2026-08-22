import { Routes } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LandingComponent } from './features/components/landing/landing.component';
import { HeroComponent } from './features/components/landing/hero/hero.component';

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
            }
        ]
    }
];
