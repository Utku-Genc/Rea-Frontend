import { Pipe, PipeTransform } from '@angular/core';

//Para Düzenleme Pipe

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'TRY'): string {
    const formattedPrice = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currencyCode
    }).format(value);
    return formattedPrice;
  }

}