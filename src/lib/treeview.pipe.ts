import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';
import { TreeviewItem } from './treeview-item';

@Pipe({
    name: 'ngxTreeview'
})
export class TreeviewPipe implements PipeTransform {
    transform(objects: any[], textField: string, checked:boolean = false): TreeviewItem[] {
        if (isNil(objects)) {
            return undefined;
        }

        return objects.map(object => {
          if(object.children) {
            return new TreeviewItem({ text: object[textField], value: object, checked, children: this.transform(object.children, textField, checked) })
          } else {
            return new TreeviewItem({ text: object[textField], value: object, checked })
          }
        });
    }
}
