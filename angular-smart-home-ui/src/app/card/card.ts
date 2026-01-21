import { Component, input, ChangeDetectionStrategy, output, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICard, Item } from '../models/models';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Sensor } from '../sensor/sensor';
import { Device } from '../device/device';
import { Highlighting } from '../common/directives/highlighting';
import { resolveLayoutClass } from '../common/service/utilites';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    MatSlideToggleModule,
    Sensor,
    Device,
    Highlighting,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  public readonly entityCard = input.required<ICard>();
  protected readonly directionLayout = computed(() => resolveLayoutClass(this.entityCard().layout));

  public readonly onCardChange = output<ICard>();

  protected readonly isTitleSwitcher = computed(this.calcActiveDevice.bind(this));
  protected readonly isAtLeastOneDeviceIsOn = computed(this.isAllActiveDevices.bind(this));

  protected calcActiveDevice(): boolean {
    return this.entityCard().items.filter((element) => element.type === 'device').length > 1;
  }

  ngOnInit() {
    console.log(this.entityCard(), 'card');
  }

  protected isAllActiveDevices(): boolean {
    const result = this.entityCard().items.filter((item) => {
      if (item.type === 'device') {
        return !!item.state;
      }
      return;
    }).length;
    return !!result;
  }

  protected onToggleState(item: Item) {
    const updatedCard = {
      ...this.entityCard(),
      items: this.entityCard().items.map((index) =>
        index.label === item.label && index.type === 'device'
          ? { ...index, state: !index.state }
          : index,
      ),
    };
    this.onCardChange.emit(updatedCard);
  }

  protected onAllTogglesState(state: boolean) {
    const updatedCard = {
      ...this.entityCard(),
      items: this.entityCard().items.map((index) =>
        index.type === 'device' ? { ...index, state } : index,
      ),
    };
    this.onCardChange.emit(updatedCard);
  }

  isDevice(item: Item) {
    return item.type === 'device';
  }
  isSensor(item: Item) {
    return item.type === 'sensor';
  }
}
