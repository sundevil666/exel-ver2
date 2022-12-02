import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/tableFunction';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'click']
    });
  }

  toHTML() {
    return createTable(35)
  }

  onClick() {}

  onMousedown(e) {
    if (shouldResize(e)) {
      tableResizeHandler(this.$root, e)
    }
  }

  onMousemove() {
    console.log('mousemove');
  }

  onMouseup() {
    console.log('mauseup');
  }
}