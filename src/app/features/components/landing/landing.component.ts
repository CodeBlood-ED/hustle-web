import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CartComponent } from '../cart/cart.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, CartComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements AfterViewInit {
  tl = gsap.timeline();
  mm = gsap.matchMedia();
  productList = [
    {
      id: 1,
      prod_name: 'iphone 17 Pro',
    },
    {
      id: 1,
      prod_name: 'iphone 17 ',
    },
    {
      id: 1,
      prod_name: 'iphone 16 Pro Max',
    },
    {
      id: 1,
      prod_name: 'iphone 16 Pro',
    },
    {
      id: 1,
      prod_name: 'iphone 16 ',
    },
    {
      id: 1,
      prod_name: 'iphone 15 Pro Max',
    },
    {
      id: 1,
      prod_name: 'iphone 15 Pro',
    },
    {
      id: 1,
      prod_name: 'iphone 15',
    },
  ];
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.tl
      .to(this.el.nativeElement.querySelector('#h1a'), {
        y: -100,
        opacity: 0,
        duration: 0.3,
        delay: 0.6,
        scrollTrigger: {
          trigger: this.el.nativeElement.querySelector('p'),
          scroller: 'body',
          start: 'top 40%',
          end: 'top 30%',
          scrub: 1,
        },
      })
      .to(this.el.nativeElement.querySelector('#h1b'), {
        y: -100,
        opacity: 0,
        duration: 0.3,
        delay: 0.9,
        scrollTrigger: {
          trigger: this.el.nativeElement.querySelector('.sec_2'),
          scroller: 'body',
          start: 'top 60%',
          end: 'top 50%',
          scrub: 1,
        },
      })
      .to(this.el.nativeElement.querySelector('.left p'), {
        y: -100,
        opacity: 0,
        duration: 0.3,
        delay: 1.2,
        scrollTrigger: {
          trigger: this.el.nativeElement.querySelector('.sec_2'),
          scroller: 'body',
          start: 'top 55%',
          end: 'top 45%',
          scrub: 1,
        },
      });
  }
}
