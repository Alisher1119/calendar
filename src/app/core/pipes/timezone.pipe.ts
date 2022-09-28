import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timezone'
})
export class TimezonePipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    const timezone = value / -60
    return 'UTC' + (timezone >= 0 ? `+${timezone}` : `${timezone}`);
  }

}
