import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reminder'
})
export class ReminderPipe implements PipeTransform {

  transform(value: Date): string {
    const today = new Date();
    const targetDate = new Date(value);
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysLeft > 1) {
      return `${daysLeft} days left`;
    } else if (daysLeft === 1) {
      return `1 day left`;
    } else if (daysLeft === 0) {
      return `Today`;
    } else {
      return `Expired`;
    }
  }

}
