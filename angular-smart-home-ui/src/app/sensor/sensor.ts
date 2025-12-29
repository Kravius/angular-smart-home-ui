import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { layoutDirection, SensorItem } from '../models/models';
import { SensorValuePipe } from '../common/pipes/sensor-value-pipe';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sensor',
  imports: [SensorValuePipe, MatIcon],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sensor {
  public readonly entity = input.required<SensorItem>();
  public readonly layout = input.required<layoutDirection>();
}
