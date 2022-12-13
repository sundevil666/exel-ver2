import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyle} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }
  prepare () {
    this.initialState(defaultStyle)
  }

  get template() {
    return createToolbar(this.state)
  }
  toHTML () {
    return this.template
  }

  storeChanged (change) {
    this.setState(change.currentStyles)
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:appStyle', value)
    }
  }
}