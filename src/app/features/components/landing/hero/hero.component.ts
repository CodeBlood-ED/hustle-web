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

  ngOnInit(): void {
    this.tl
      .from(this.el.nativeElement.querySelector('.part_1 h1'), {
        x: -30,
        opacity: 0,
        duration: 0.3,
        delay: 2.5,
      })

      .from(this.el.nativeElement.querySelectorAll('.part_1 .quick_access'), {
        x: -30,
        opacity: 0,
        duration: 0.3,
        delay: 0,
      })

      .from(this.el.nativeElement.querySelectorAll('.part_2 .left #h1a'), {
        y: -30,
        opacity: 0,
        duration: 0.3,
        delay: 0,
      })

      .from(this.el.nativeElement.querySelectorAll('.part_2 .left #h1b'), {
        y: -30,
        opacity: 0,
        duration: 0.3,
        delay: 0,
      })

      .from(this.el.nativeElement.querySelectorAll('.part_2 .left p'), {
        y: -30,
        opacity: 0,
        duration: 0.3,
        delay: 0,
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
        end: '+=400',
        scrub: true,
      }
    })
    gsap.to(this.el.nativeElement.querySelector('.part_2 .left #h1b'),{
      y: -100,
      opacity: 0.5,
      color: 'white',
      delay: 0.8,
      duration:1,
      scrollTrigger: {
        trigger: this.el.nativeElement.querySelector('.sec_2'),
        scroller: 'body',
        start: 'top top',
        end: '+=400',
        scrub: true,
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
        end: '+=400',
        scrub: true,
      }
    })
    
    });
  }
}
