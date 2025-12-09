import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appHighlighting]',
  standalone: true,
})
export class Highlighting {
  isActive = input<boolean>();

  @HostBinding('class.active-light')
  get glowClass() {
    return !!this.isActive();
  }
}
