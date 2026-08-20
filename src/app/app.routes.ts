import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LandingComponent } from './features/components/landing/landing.component';

export const routes: Routes = [
    {
        path:'',
        component: LoaderComponent
    },
    {
        path:'landing',
        component: LandingComponent
    }
];
