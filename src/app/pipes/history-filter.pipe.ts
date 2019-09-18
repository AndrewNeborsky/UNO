import { Pipe, PipeTransform } from '@angular/core';
import { PayHistory } from '../models/payHistory.model';

@Pipe({
  name: 'historyFilter'
})
export class HistoryFilterPipe implements PipeTransform {

  transform(history: PayHistory[], bonuceNameSearch: string): any {
    return history.filter((el: PayHistory) => {
      return el.bonuce_name.toLocaleLowerCase().includes(bonuceNameSearch?bonuceNameSearch.toLocaleLowerCase():'')
    })
  }

}
