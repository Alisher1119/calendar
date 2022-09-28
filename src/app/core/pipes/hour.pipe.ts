import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hour'
})
export class HourPipe implements PipeTransform {

  transform(value: any): string {
    const hour = parseInt(value);
    return (hour < 10 ? `0${hour}`: `${hour}`) + ':00';
  }
}
