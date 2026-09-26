import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { gsap, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, AfterViewInit {
  tl = gsap.timeline();
  productList = [
    {
      id: 1,
      prod_name: 'iphone 17 Pro',
    },
    {
      id: 2,
      prod_name: 'iphone 17 ',
    },
    {
      id: 3,
      prod_name: 'iphone 16 Pro Max',
    },
    {
      id: 4,
      prod_name: 'iphone 16 Pro',
    },
    {
      id: 5,
      prod_name: 'iphone 16 ',
    },
    {
      id: 6,
      prod_name: 'iphone 15 Pro Max',
    },
    {
      id: 7,
      prod_name: 'iphone 15 Pro',
    },
    {
      id: 8,
      prod_name: 'iphone 15',
    },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.tl
      .from(this.el.nativeElement.querySelector('.part_1 h1'), {
        x: -18,
        opacity: 0,
        duration: 0.68,
        delay: 1.9,
        ease: 'power3.out',
      })

      .from(this.el.nativeElement.querySelectorAll('.part_1 .quick_access'), {
        x: -14,
        opacity: 0,
        duration: 0.62,
        delay: 0,
        ease: 'power3.out',
      })

      .from(this.el.nativeElement.querySelectorAll('.part_2 .left #h1a'), {
        y: -16,
        opacity: 0,
        duration: 0.64,
        delay: 0,
        ease: 'power3.out',
      })

      .from(this.el.nativeElement.querySelectorAll('.part_2 .left #h1b'), {
        y: -14,
        opacity: 0,
        duration: 0.64,
        delay: 0,
        ease: 'power3.out',
      })

      .from(this.el.nativeElement.querySelectorAll('.part_2 .left p'), {
        y: -12,
        opacity: 0,
        duration: 0.64,
        delay: 0,
        ease: 'power3.out',
      });
  }

  ngAfterViewInit():void {
    
    this.tl.eventCallback('onComplete', ()=> {
      gsap.to(this.el.nativeElement.querySelector('.part_2 .left #h1a'),{
      y: -100,
      opacity: 0.5,
      color: 'white',
      duration:1,
      scrollTrigger: {
        trigger: this.el.nativeElement.querySelector('.sec_2'),
        scroller: 'body',
        start: 'top top',
        end: '+=520',
        scrub: 1,
      }
    })
    gsap.to(this.el.nativeElement.querySelector('.part_2 .left #h1b'),{
      y: -100,
      opacity: 0.5,
      color: 'white',
      delay: 0.25,
      duration:1,
      scrollTrigger: {
        trigger: this.el.nativeElement.querySelector('.sec_2'),
        scroller: 'body',
        start: 'top top',
        end: '+=520',
        scrub: 1,
      }
    })
    gsap.to(this.el.nativeElement.querySelector('.part_2 .left p'),{
      y: -100,
      opacity: 0.5,
      color:'white',
      duration:1,
      scrollTrigger: {
        trigger: this.el.nativeElement.querySelector('.sec_2'),
        scroller: 'body',
        start: 'top top',
        end: '+=520',
        scrub: 1,
      }
    })
    
    });
  }
}
