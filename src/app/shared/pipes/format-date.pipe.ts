import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
      if (!value) {
          return '';
      }
      console.log(value)
      const dateParts = value.split('-');
      const year = dateParts[0];
      const monthIndex = parseInt(dateParts[1]) - 1;
      const day = dateParts[2];

      const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthName = monthNames[monthIndex];

      return `${monthName}-${day}-${year}`;
  }

}
