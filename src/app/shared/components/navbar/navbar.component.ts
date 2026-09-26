import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SignupComponent } from '../authentication/signup/signup.component';
import { LoginComponent } from '../authentication/login/login.component';
import { Router, RouterLink } from '@angular/router';
import { NavbarEntranceService } from '../../services/navbar-entrance.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [SignupComponent, LoginComponent, RouterLink],
})
export class NavbarComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private router: Router,
    private entranceAnimation: NavbarEntranceService,
  ) {}
  openRegistration: boolean = false;
  openLogin: boolean = false;
  menuOpen = false;

  tl = gsap.timeline();
  tl_login = gsap.timeline();

  items = [
    { id: 0, name: 'Categories', page_address: '/landing/categories' },
    { id: 1, name: 'New arrivals', page_address: '/landing/new-arrivals' },
    { id: 2, name: 'Contact', page_address: '/landing/contact' },
    { id: 3, name: 'About us', page_address: '/landing/about' },
  ];
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  ngAfterViewInit(): void {
    if (!this.entranceAnimation.shouldAnimate(this.router.url)) return;
    gsap.from(this.el.nativeElement.querySelector('.part1'), {
      y: -18,
      opacity: 0,
      duration: 0.68,
      delay: 0.35,
      ease: 'power3.out',
    });

    gsap.from(this.el.nativeElement.querySelectorAll('.part2 .sub-section'), {
      y: -16,
      opacity: 0,
      duration: 0.62,
      delay: 0.65,
      stagger: 0.1,
      ease: 'power3.out',
    });

    gsap.from(this.el.nativeElement.querySelectorAll('.part3'), {
      y: -14,
      opacity: 0,
      duration: 0.62,
      delay: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }

  toggleRegistration() {
    this.openRegistration = !this.openRegistration;

    const signupForm = this.el.nativeElement.querySelector('app-signup .main');
    const signUpButton = this.el.nativeElement.querySelector('.signUp');
    //const loginForm = this.el.nativeElement.querySelector('');
    const loginButton = this.el.nativeElement.querySelector('.logIn');
    //const breakLine = this.el.nativeElement.querySelector('.breakLine');
    if (!signupForm) return;

    if (this.openRegistration) {
      // Animate signup form in

      this.tl
        .to(signUpButton, {
          width: '100%',
          color: 'white',
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(
          loginButton,
          {
            width: '0%',
            padding: '0',
            right: '-50%',
            overflow: 'hidden',
            color: '#fac5d2',
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .to(signupForm, {
          opacity: 1,
          height: 'auto',
          pointerEvents: 'auto',
          zIndex: '1100',
          duration: 0.2,
          ease: 'power2.out',
        });
    } else {
      // Animate signup form out
      this.tl
        .to(signupForm, {
          opacity: 0,
          height: '0%',
          pointerEvents: 'none',
          duration: 0.5,
          ease: 'power2.out',
        })
        .to(signUpButton, {
          width: '100%',
          color: 'white',
          ease: 'power2.out',
        })
        .to(
          loginButton,
          {
            width: '100%',
            height: '50',
            padding: '5 20',

            color: 'white',
            overflow: '',
            ease: 'power2.out',
          },
          '-=0.5',
        );
    }
  }

  toggleLogin() {
    this.openLogin = !this.openLogin;

    //const signupForm = this.el.nativeElement.querySelector('app-signup .main');
    const signUpButton = this.el.nativeElement.querySelector('.signUp');
    const loginForm = this.el.nativeElement.querySelector('app-login .main');
    const loginButton = this.el.nativeElement.querySelector('.logIn');

    if (!loginForm) return;

    if (this.openLogin) {
      this.tl_login
        .to(loginButton, {
          width: '100%',
          color: 'white',
          duration: 0.2,
          ease: 'power2.out',
        })
        .to(
          signUpButton,
          {
            width: '0%',
            padding: '0',
            left: '-50%',
            overflow: 'hidden',
            color: '#0d917e',
            ease: 'power2.out',
          },
          '-=0.3',
        )
        .to(loginForm, {
          opacity: 1,
          height: 'auto',
          pointerEvents: 'auto',
          zIndex: '1100',
          duration: 0.2,
          ease: 'power2.out',
        });
    } else {
      // Animate login form out

      this.tl_login
        .to(loginForm, {
          opacity: '0',
          height: '0%',
          pointerEvents: 'none',
          duration: 0.5,
          ease: 'power2.out',
        })
        .to(signUpButton, {
          width: '100%',
          color: 'white',
          ease: 'power2.out',
        })
        .to(
          loginButton,
          {
            width: '100%',
            height: '50',
            padding: '5 20',

            color: 'white',
            overflow: '',
            ease: 'power2.out',
          },
          '-=0.5',
        );
    }
  }
}
