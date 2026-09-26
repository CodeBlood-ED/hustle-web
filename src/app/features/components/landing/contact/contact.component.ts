import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private animationContext?: gsap.Context;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.animationContext = gsap.context(() => {
      gsap.from('.contact-intro > *', {
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
