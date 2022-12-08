import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template';
import {tableResizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from '@/components/table/tableFunction';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML() {
    return createTable(35)
  }
  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  onMousedown(e) {
    if (shouldResize(e)) {
      tableResizeHandler(this.$root, e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)


        const $cell = matrix(target, current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cell)
      } else {
        this.selection.select($target)
      }
    }
  }

  onMousemove() {
    console.log('mousemove');
  }

  onMouseup() {
    console.log('mauseup');
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const {key} = e

    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }
  onInput(e) {
    this.$emit('table:input', $(e.target))
  }
}
