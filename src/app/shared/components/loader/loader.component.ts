import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements AfterViewInit, OnInit, OnDestroy {
  constructor(
    private el: ElementRef,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    const brandMark = this.el.nativeElement.querySelector('.brand-mark');
    const brandAccent = this.el.nativeElement.querySelector('.brand-accent');
    const greenScreen = this.el.nativeElement.querySelector('.green');
    const pinkScreen = this.el.nativeElement.querySelector('.pink');

    gsap.timeline()
      .fromTo(brandMark, { autoAlpha: 0, y: 18, scale: 0.92, rotate: -3 }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.78,
        ease: 'power3.out',
      })
      .to(brandMark, {
        scale: 1.025,
        duration: 0.3,
        repeat: 2,
        yoyo: true,
        ease: 'sine.inOut',
      })
      .to(brandAccent, {
        scale: 1.5,
        duration: 0.3,
        repeat: 2,
        yoyo: true,
        ease: 'sine.inOut',
      }, '<')
      .to(greenScreen, { height: '100%', duration: 0.62, ease: 'power2.inOut' })
      .to(pinkScreen, { height: '100%', duration: 0.62, ease: 'power2.inOut' });
  }

  ngOnDestroy(): void {
    const brandMark = this.el.nativeElement.querySelector('.brand-mark');
    const brandAccent = this.el.nativeElement.querySelector('.brand-accent');
    const greenScreen = this.el.nativeElement.querySelector('.green');
    const pinkScreen = this.el.nativeElement.querySelector('.pink');
    gsap.killTweensOf([brandMark, brandAccent, greenScreen, pinkScreen]);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/landing']);
    }, 2400);
  }
}
