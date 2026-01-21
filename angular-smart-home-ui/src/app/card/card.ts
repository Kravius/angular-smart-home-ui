import { Component, input, ChangeDetectionStrategy, output, computed, inject } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { DevicesActionsGroup } from 'app/device/reducer/devices.actions';

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
  public readonly entityCard = input.required<ICard>(); // selector from parent
  protected readonly directionLayout = computed(() => resolveLayoutClass(this.entityCard().layout));
  readonly #store: Store<AppState> = inject(Store);
  public readonly onCardChange = output<ICard>();

  protected readonly isTitleSwitcher = computed(this.calcActiveDevice.bind(this));
  protected readonly isAtLeastOneDeviceIsOn = computed(this.isAllActiveDevices.bind(this));

  protected calcActiveDevice(): boolean {
    return this.entityCard().items.filter((element) => element.type === 'device').length > 1;
  }

  ngOnInit() {
    // console.log(this.entityCard());
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

  protected toggleDeviceState(deviceId: string, newState: boolean) {
    this.#store.dispatch(
      DevicesActionsGroup.toggleDeviceState({ deviceId, newState, idCard: this.entityCard().id }),
    );
    console.log(this.entityCard());
  }

  // protected onToggleState(item: Item) {
  //   const updatedCard = {
  //     ...this.entityCard(),
  //     items: this.entityCard().items.map((index) =>
  //       index.label === item.label && index.type === 'device'
  //         ? { ...index, state: !index.state }
  //         : index,
  //     ),
  //   };
  //   this.onCardChange.emit(updatedCard);
  // } // TODO DELETE

  protected allTogglesState(state: boolean) {
    // this.#store.dispatch(DevicesActionsGroup.allTogglesState(state));
    const updatedCard = {
      ...this.entityCard(),
      items: this.entityCard().items.map((index) =>
        index.type === 'device' ? { ...index, state } : index,
      ),
    };
    // this.onCardChange.emit(updatedCard);
  }

  isDevice(item: Item) {
    return item.type === 'device';
  }
  isSensor(item: Item) {
    return item.type === 'sensor';
  }
}
