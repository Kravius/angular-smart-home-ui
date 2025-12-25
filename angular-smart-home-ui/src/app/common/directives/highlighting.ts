import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appHighlighting]',
})
export class Highlighting {
  readonly isActive = input<boolean>();

  @HostBinding('class.active-light')
  get glowClass() {
    return !!this.isActive();
  }
}
