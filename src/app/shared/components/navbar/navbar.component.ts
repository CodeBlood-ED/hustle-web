import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { SignupComponent } from '../authentication/signup/signup.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [CommonModule, SignupComponent],
})
export class NavbarComponent implements AfterViewInit {
  onMouseLeave($event: MouseEvent) {
    gsap.to($event.currentTarget,{
      height: '50',
      width: '200',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#a6ff00',
      fontSize: '18',
      padding: '5 20',
    });
  }
  onMouseEnter($event: MouseEvent) {
    gsap.to($event.currentTarget,{
      backgroundColor: 'black',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer'
    })
  }
  constructor(private el: ElementRef) {}
  openRegistration: boolean = false;

  tl = gsap.timeline();

  items = [
    { id: 0, name: 'Categories' },
    { id: 1, name: 'New arrivals' },
    { id: 2, name: 'Contact' },
    { id: 3, name: 'About us' },
  ];

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
    const breakLine = this.el.nativeElement.querySelector('.breakLine');
    if (!signupForm) return;

    if (this.openRegistration) {
      // Animate signup form in

      this.tl
        .to(signUpButton, {
          width: '100%',
          color:'white',
          duration: 0.6,
          ease: 'power2.out',
        })
        .to(breakLine,{
          width:'0',
          height: '0',
          ease: 'power2.out'
        },'-=0.3')
        .to(loginButton, {
          width: '0%',
          height: '0%',
          padding: '0',
          right:'-50%',
          overflow: 'hidden',
          ease: 'power2.out',
        }, '-=1')
        .to(signupForm, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'power2.out',
        })
        ;
    } else {
      // Animate signup form out
      this.tl
      .to(signupForm, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
        ease: 'power2.in',
      })
      .to(signUpButton, {
          width: '100%',
          color:'white',
          duration: 0.6,
          ease: 'power2.out',
        })
        .to(breakLine,{
          width:'3',
          height: '50',
          ease: 'power2.out'
        },'-=0.3')
        .to(loginButton, {
          width: '100%',
          height: '50',
          padding: '5 20',
          overflow: '',
          ease: 'power2.out',
        }, '-=1');
    }
  }
}
