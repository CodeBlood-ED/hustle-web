import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { gsap, ScrollTrigger } from 'gsap/all';


gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements AfterViewInit{

  divRef = viewChild.required<ElementRef<HTMLDivElement>>('part_2');
  
  constructor(private el: ElementRef) {}

  ngAfterViewInit() : void {
    gsap.to(this.el.nativeElement.querySelector('.green_bg'), {
      width: '30%',
      scrollTrigger: {
        trigger: 'divRef',
        scroller: 'body',
        markers: true,
        scrub: 1,
        pin: true
      }
    });
    gsap.to(this.el.nativeElement.querySelector('.pink_bg'), {
      width: '70%',
      scrollTrigger: {
        trigger: 'divRef',
        scroller: 'body',
        markers: true,
        scrub: 1,
        pin:true
      }
    });

  }
}
