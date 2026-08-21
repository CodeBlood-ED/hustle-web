import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SignupComponent } from '../authentication/signup/signup.component';
import { LoginComponent } from '../authentication/login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [CommonModule, SignupComponent, LoginComponent],
})
export class NavbarComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}
  openRegistration: boolean = false;
  openLogin: boolean = false;
  //menuOpen: boolean = false;

  tl = gsap.timeline();
  tl_login = gsap.timeline();

  items = [
    { id: 0, name: 'Categories' },
    { id: 1, name: 'New arrivals' },
    { id: 2, name: 'Contact' },
    { id: 3, name: 'About us' },
  ];
  activeIndex = 0;
  private touchStartX = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;
    const swipeThreshold = 40; // minimum px of movement to count as a swipe

    if (deltaX < -swipeThreshold) {
      // swiped right-to-left → advance to next item
      this.activeIndex = Math.min(this.activeIndex + 1, this.items.length - 1);
    } else if (deltaX > swipeThreshold) {
      // swiped left-to-right → go back to previous item
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    }
  }

  ngAfterViewInit(): void {
    gsap.from(this.el.nativeElement.querySelector('.logo'), {
      y: -30,
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
    });

    gsap.from(this.el.nativeElement.querySelectorAll('li'), {
      y: -30,
      opacity: 0,
      duration: 0.7,
      delay: 1,
      stagger: 0.25,
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
          zIndex:'1100',
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
    this.tl.kill;
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
        .to(signUpButton, {
          width: '0%',
          padding: '0',
          left: '-50%',
          overflow: 'hidden',
          color: '#0d917e',
          ease: 'power2.out',
        },'-=0.3')
        .to(loginForm, {
          opacity: 1,
          height: 'auto',
          pointerEvents: 'auto',
          zIndex:'1100',
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

  // openHamburgerMenu() {
  //   this.menuOpen = true;
  // }
  // closeHamburgerMenu() {
  //   this.menuOpen = false;
  // }
}
