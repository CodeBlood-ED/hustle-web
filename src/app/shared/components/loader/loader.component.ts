import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements AfterViewInit, OnInit {
  constructor(
    private el: ElementRef,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    var img = this.el.nativeElement.querySelector('img');
    var lastName = this.el.nativeElement.querySelector('#lastName');
    var greenScreen = this.el.nativeElement.querySelector('.green');
    var pinkScreen = this.el.nativeElement.querySelector('.pink');

    var tl = gsap.timeline();

    tl.from(img, {
      x: 80,
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      ease: 'back.out(10)',
    })
      // .from(lastName, {
      //   x: 50,
      //   opacity: 0,
      //   duration: 0.5,
      //   ease: 'back.out(3)',
      // })
      .to(img, {
        height: '0%',
        opacity: 0,
        duration: 0.5,
        ease: 'back.in(2)',
      })
      // .to(lastName, {
      //   height: '0%',
      //   opacity: 0,
      //   duration: 0.5,
      //   ease: 'back.in(2)',
      // })
      .to(greenScreen, {
        height: '100%',
      })
      .to(pinkScreen, {
        height: '100%',
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/featured-products']);
    }, 2400);
  }
}
