import { Component, input } from '@angular/core';
import { Card } from '../card/card';
import { Tab } from '../models/models';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  public readonly data = input.required<Tab>();
}
