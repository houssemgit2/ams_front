import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addIng',
})
export class AddIngPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
