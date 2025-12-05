import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  effect,
  computed,
  runInInjectionContext,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICard, ICardLayout } from '../models/models';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

type direction = 'horizontal-layout' | 'single-device' | 'vertical-layout';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgClass],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  public readonly entityCard = input.required<ICard>();
  protected readonly directionLayout = signal<direction>('horizontal-layout');
  constructor() {
    effect(() => {
      console.log(this.entityCard());
      switch (this.entityCard().layout) {
        case 'horizontalLayout': {
          this.directionLayout.set('horizontal-layout');
          break;
        }
        case 'singleDevice': {
          this.directionLayout.set('single-device');
          break;
        }
        case 'verticalLayout': {
          this.directionLayout.set('vertical-layout');
          break;
        }
        // default: {
        //   this.directionLayout.set('horizontal-layout');
        // }
      }
    });
  }
}
