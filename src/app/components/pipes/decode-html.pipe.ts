import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'decode'
})
export class DecodeHtmlPipe implements PipeTransform {

  constructor() {
  }

  transform(value: any): any {
    const e = document.createElement('div');
    e.innerHTML = value;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }


}
