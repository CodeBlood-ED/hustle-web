import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
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
  menuOpen = false;
  activeAuth: 'none' | 'signup' | 'login' = 'none';

  items = [
    { id: 0, name: 'Categories', page_address: '/landing/categories' },
    { id: 1, name: 'New arrivals', page_address: '/landing/new-arrivals' },
    { id: 2, name: 'Contact', page_address: '/landing/contact' },
    { id: 3, name: 'About us', page_address: '/landing/about' },
  ];

  constructor(
    private el: ElementRef<HTMLElement>,
    private router: Router,
    private entranceAnimation: NavbarEntranceService,
  ) {}

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.activeAuth === 'none') return;

    const target = event.target as HTMLElement | null;
    if (!target) return;

    const part3 = this.el.nativeElement.querySelector('.part3');
    if (part3 && part3.contains(target)) {
      return;
    }

    this.closeAuth();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeAuth !== 'none') {
      this.closeAuth();
    }
  }

  closeAuth(): void {
    if (this.activeAuth === 'none') return;
    this.activeAuth = 'none';

    const signUpButton = this.el.nativeElement.querySelector('.signUp');
    const loginButton = this.el.nativeElement.querySelector('.logIn');
    const signupForm = this.el.nativeElement.querySelector('app-signup .main');
    const loginForm = this.el.nativeElement.querySelector('app-login .main');

    gsap.killTweensOf([signUpButton, loginButton, signupForm, loginForm]);

    const tl = gsap.timeline();

    if (signupForm) {
      tl.to(
        signupForm,
        {
          opacity: 0,
          height: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0,
      );
    }

    if (loginForm) {
      tl.to(
        loginForm,
        {
          opacity: 0,
          height: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0,
      );
    }

    if (signUpButton) {
      tl.to(
        signUpButton,
        {
          width: '50%',
          color: '#111',
          clearProps: 'left,right,overflow',
          duration: 0.3,
          ease: 'power2.out',
        },
        0,
      );
    }

    if (loginButton) {
      tl.to(
        loginButton,
        {
          width: '50%',
          color: '#111',
          padding: '5px 20px',
          clearProps: 'left,right,overflow',
          duration: 0.3,
          ease: 'power2.out',
        },
        0,
      );
    }
  }

  openSignup(): void {
    this.activeAuth = 'signup';

    const signUpButton = this.el.nativeElement.querySelector('.signUp');
    const loginButton = this.el.nativeElement.querySelector('.logIn');
    const signupForm = this.el.nativeElement.querySelector('app-signup .main');
    const loginForm = this.el.nativeElement.querySelector('app-login .main');

    gsap.killTweensOf([signUpButton, loginButton, signupForm, loginForm]);

    if (loginForm) {
      gsap.set(loginForm, { opacity: 0, height: 0, pointerEvents: 'none' });
    }

    const tl = gsap.timeline();

    if (signUpButton) {
      tl.to(
        signUpButton,
        {
          width: '100%',
          color: 'white',
          duration: 0.25,
          ease: 'power2.out',
        },
        0,
      );
    }

    if (loginButton) {
      tl.to(
        loginButton,
        {
          width: '0%',
          padding: '0',
          overflow: 'hidden',
          color: '#fac5d2',
          duration: 0.25,
          ease: 'power2.out',
        },
        0,
      );
    }

    if (signupForm) {
      tl.to(
        signupForm,
        {
          opacity: 1,
          height: 'auto',
          pointerEvents: 'auto',
          zIndex: 1100,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.05,
      );
    }
  }

  openLogin(): void {
    this.activeAuth = 'login';

    const signUpButton = this.el.nativeElement.querySelector('.signUp');
    const loginButton = this.el.nativeElement.querySelector('.logIn');
    const signupForm = this.el.nativeElement.querySelector('app-signup .main');
    const loginForm = this.el.nativeElement.querySelector('app-login .main');

    gsap.killTweensOf([signUpButton, loginButton, signupForm, loginForm]);

    if (signupForm) {
      gsap.set(signupForm, { opacity: 0, height: 0, pointerEvents: 'none' });
    }

    const tl = gsap.timeline();

    if (loginButton) {
      tl.to(
        loginButton,
        {
          width: '100%',
          color: 'white',
          duration: 0.25,
          ease: 'power2.out',
        },
        0,
      );
    }

    if (signUpButton) {
      tl.to(
        signUpButton,
        {
          width: '0%',
          padding: '0',
          overflow: 'hidden',
          color: '#0d917e',
          duration: 0.25,
          ease: 'power2.out',
        },
        0,
      );
    }

    if (loginForm) {
      tl.to(
        loginForm,
        {
          opacity: 1,
          height: 'auto',
          pointerEvents: 'auto',
          zIndex: 1100,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.05,
      );
    }
  }

  toggleRegistration(): void {
    if (this.activeAuth === 'signup') {
      this.closeAuth();
    } else {
      this.openSignup();
    }
  }

  toggleLogin(): void {
    if (this.activeAuth === 'login') {
      this.closeAuth();
    } else {
      this.openLogin();
    }
  }

  openLoginFromSignup(): void {
    this.openLogin();
  }

  openSignupFromLogin(): void {
    this.openSignup();
  }
}
