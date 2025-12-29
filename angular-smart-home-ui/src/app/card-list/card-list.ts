import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Card } from '../card/card';
import { ICard, Tab } from '../models/models';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardList {
  public readonly data = input.required<Tab>();
  public readonly cardChange = output<ICard>();

  handleCardChange(card: ICard) {
    this.cardChange.emit(card);
  }
}
