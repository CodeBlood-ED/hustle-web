import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RouteLoaderComponent } from './shared/components/route-loader/route-loader.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { ScrollEffectsService } from './shared/services/scroll-effects.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouteLoaderComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  isRouteLoading = false;
  private destroy$ = new Subject<void>();
  private hideLoaderTimeout: ReturnType<typeof setTimeout> | null = null;
  private hasLoadedLandingPage = false;

  constructor(
    private router: Router,
    private scrollEffects: ScrollEffectsService,
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollEffects.refreshForCurrentRoute();
        if (event.urlAfterRedirects.startsWith('/landing')) {
          this.hasLoadedLandingPage = true;
        }
      }

      if (event instanceof NavigationStart) {
        if (this.hasLoadedLandingPage && !event.url.startsWith('/landing')) {
          this.showRouteLoader();
        }
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        if (this.hasLoadedLandingPage) {
          this.hideRouteLoader();
        }
      }
    });
  }

  private showRouteLoader(): void {
    if (this.hideLoaderTimeout) {
      clearTimeout(this.hideLoaderTimeout);
      this.hideLoaderTimeout = null;
    }

    this.isRouteLoading = true;
  }

  private hideRouteLoader(): void {
    if (this.hideLoaderTimeout) {
      clearTimeout(this.hideLoaderTimeout);
    }

    this.hideLoaderTimeout = setTimeout(() => {
      this.isRouteLoading = false;
      this.hideLoaderTimeout = null;
    }, 450);
  }

  ngOnDestroy(): void {
    if (this.hideLoaderTimeout) {
      clearTimeout(this.hideLoaderTimeout);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }
}
