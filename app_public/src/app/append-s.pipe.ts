import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendS'
})

export class AppendSPipe implements PipeTransform {

  transform(randomNum: number): String {
    let ap = '';
    let final;
    if(randomNum > 1000) {
      ap = 'km';
      final = ((randomNum/1000).toFixed(2)).toString();
    } else {
      ap = 'm';
      final = (randomNum.toFixed(2)).toString();

    }
    return ( final + ap );
  }

}
