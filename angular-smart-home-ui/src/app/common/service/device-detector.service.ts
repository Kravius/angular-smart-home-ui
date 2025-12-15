import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceDetectorService {
  readonly #isMobile = signal<boolean>(false);
  #breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  public readonly isMobile: Signal<boolean> = this.#isMobile;

  constructor() {
    this.#breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.#isMobile.set(result.matches);
    });
  }
}
