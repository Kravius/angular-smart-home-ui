import { Component, input } from '@angular/core';
import { DeviceItem, layoutDirection } from '../models/models';
import { MatIcon } from '@angular/material/icon';
import { Highlighting } from '../common/directives/highlighting';

@Component({
  selector: 'app-device',
  imports: [MatIcon, Highlighting],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  public readonly entity = input.required<DeviceItem>();
  public readonly layout = input.required<layoutDirection>();
  
}
