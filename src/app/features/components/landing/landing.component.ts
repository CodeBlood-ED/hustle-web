import { AfterViewInit, Component,  ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, CartComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {
  
  tl = gsap.timeline();
  productList = [{
    id: 1,
    prod_name: 'iphone 17 Pro',
  },{
    id: 1,
    prod_name: 'iphone 17 ',
  },{
    id: 1,
    prod_name: 'iphone 16 Pro Max',
  },{
    id: 1,
    prod_name: 'iphone 16 Pro',
  },{
    id: 1,
    prod_name: 'iphone 16 ',
  },{
    id: 1,
    prod_name: 'iphone 15 Pro Max',
  },{
    id: 1,
    prod_name: 'iphone 15 Pro',
  },{
    id: 1,
    prod_name: 'iphone 15',
  },
]
  constructor(private el: ElementRef){}

  ngAfterViewInit(): void {
    this.tl.from(this.el.nativeElement.querySelectorAll(".top-card"),{
      y:-100,
      opacity: 0,
      duration:0.5,
      delay: 1
    })
    .from(this.el.nativeElement.querySelectorAll(".bottom-card"), {
      y:"10%",
      opacity: 0,
      duration:0.5,
      delay: 0.5
    });
  }
}
