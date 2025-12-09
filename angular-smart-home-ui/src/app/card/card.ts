import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  effect,
  computed,
  runInInjectionContext,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICard, ICardLayout, Item } from '../models/models';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SensorValuePipe } from '../common/pipes/sensor-value-pipe';
type direction = 'horizontal-layout' | 'single-device' | 'vertical-layout';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    MatSlideToggleModule,
    SensorValuePipe,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  public readonly entityCard = input.required<ICard>();
  protected readonly directionLayout = signal<direction>('horizontal-layout');
  public readonly onCardChange = output<ICard>();

  constructor() {
    effect(() => {
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
  protected onToggleState(item: Item) {
    const updatedCard = {
      ...this.entityCard(),
      items: this.entityCard().items.map((index) =>
        index.label === item.label && index.type === 'device'
          ? { ...index, state: !index.state }
          : index
      ),
    };
    this.onCardChange.emit(updatedCard);
  }
}
