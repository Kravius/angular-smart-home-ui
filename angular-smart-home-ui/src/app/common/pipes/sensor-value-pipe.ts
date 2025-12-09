import { Pipe, PipeTransform } from '@angular/core';
import { SensorValue } from '../../models/models';

@Pipe({
  name: 'sensorValue',
})
export class SensorValuePipe implements PipeTransform {
  transform(value: SensorValue): string {
    return `${value.amount}${value.unit}`;
  }
}
