import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class ScrollEffectsService {
  private animationContext?: gsap.Context;
  private refreshFrame = 0;

  refreshForCurrentRoute(): void {
    cancelAnimationFrame(this.refreshFrame);
    this.refreshFrame = requestAnimationFrame(() => this.attachEffects());
  }

  private attachEffects(): void {
    this.animationContext?.revert();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ScrollTrigger.refresh();
      return;
    }

    const selectors = [
      '.category-page .page-header',
      '.category-card',
      '.product-collection .top-bar',
      '.product-card',
      '.product-detail .detail-layout',
      '.story-section',
      '.value-item',
      '.about-signoff',
      '.contact-detail',
      '.contact-form',
      '.cart-content > *',
      '.checkout-form > .form-section',
      '.order-summary',
      '.site-footer',
    ];
    const elements = gsap.utils.toArray<HTMLElement>(selectors.join(','));

    this.animationContext = gsap.context(() => {
      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            delay: (index % 4) * 0.075,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();
  }
}