import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true,
})

export class SortPipe implements PipeTransform {

  transform(list: any[], column: string, sortDirection: boolean): any[] {
    if(column === 'age') {
      return list.sort((a, b) => sortDirection 
      ? a[column] - b[column] 
      : b[column] -a[column])
    }else {
      return list
    }
  }
}
