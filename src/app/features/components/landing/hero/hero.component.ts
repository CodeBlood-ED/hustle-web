import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private animationContext?: gsap.Context;

  productList = [
    {
      id: 1,
      prod_name: 'iPhone 17 Pro',
      model: 'iphone-17-pro',
    },
    {
      id: 2,
      prod_name: 'iPhone 17',
      model: 'iphone-17',
    },
    {
      id: 3,
      prod_name: 'iPhone 16 Pro Max',
      model: 'iphone-16-pro-max',
    },
    {
      id: 4,
      prod_name: 'iPhone 16 Pro',
      model: 'iphone-16-pro',
    },
    {
      id: 5,
      prod_name: 'iPhone 16',
      model: 'iphone-16',
    },
    {
      id: 6,
      prod_name: 'iPhone 15',
      model: 'iphone-15',
    },
    {
      id: 7,
      prod_name: 'iPhone 14',
      model: 'iphone-14',
    },
    {
      id: 8,
      prod_name: 'iPhone 13',
      model: 'iphone-13',
    },
  ];

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const host = this.el.nativeElement;
    const part2 = host.querySelector<HTMLElement>('.part_2');

    this.animationContext = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (!part2) return;

          gsap.to('.part_2 .left #h1a', {
            y: -80,
            opacity: 0.6,
            duration: 1,
            scrollTrigger: {
              trigger: part2,
              start: 'top 20%',
              end: 'bottom top',
              scrub: 1,
            },
          });

          gsap.to('.part_2 .left #h1b', {
            y: -80,
            opacity: 0.6,
            duration: 1,
            scrollTrigger: {
              trigger: part2,
              start: 'top 20%',
              end: 'bottom top',
              scrub: 1,
            },
          });

          gsap.to('.part_2 .left p', {
            y: -60,
            opacity: 0.6,
            duration: 1,
            scrollTrigger: {
              trigger: part2,
              start: 'top 20%',
              end: 'bottom top',
              scrub: 1,
            },
          });
        },
      });

      tl.from('.part_1 h1', {
        x: -18,
        opacity: 0,
        duration: 0.68,
        delay: 0.25,
        ease: 'power3.out',
      })
        .from(
          '.part_1 .quick_access',
          {
            x: -14,
            opacity: 0,
            duration: 0.62,
            ease: 'power3.out',
          },
          '-=0.3',
        )
        .from(
          '.part_2 .left #h1a',
          {
            y: -16,
            opacity: 0,
            duration: 0.64,
            ease: 'power3.out',
          },
          '-=0.2',
        )
        .from(
          '.part_2 .left #h1b',
          {
            y: -14,
            opacity: 0,
            duration: 0.64,
            ease: 'power3.out',
          },
          '-=0.4',
        )
        .from(
          '.part_2 .left p',
          {
            y: -12,
            opacity: 0,
            duration: 0.64,
            ease: 'power3.out',
          },
          '-=0.4',
        );
    }, host);
  }

  ngOnDestroy(): void {
    this.animationContext?.revert();
  }
}
