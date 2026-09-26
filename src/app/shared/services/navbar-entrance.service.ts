import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavbarEntranceService {
  private hasHandledInitialNavbar = false;

  shouldAnimate(url: string): boolean {
    if (this.hasHandledInitialNavbar) return false;
    this.hasHandledInitialNavbar = true;

    const path = url.split(/[?#]/, 1)[0].replace(/\/$/, '');
    return path === '/landing';
  }
}
