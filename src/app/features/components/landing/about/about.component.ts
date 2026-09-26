import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private animationContext?: gsap.Context;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.animationContext = gsap.context(() => {
      gsap.from('.about-intro > *', {
        y: 16,
        autoAlpha: 0,
        duration: 0.72,
        stagger: 0.12,
        ease: 'power3.out',
      });

    }, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }
}
