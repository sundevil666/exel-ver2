import {$} from '@core/dom'
import {Emitter} from '@core/Emitter';
import {StoreSubscribe} from '@core/StoreSubscribe';
import {updateDate} from '@/redux/action';

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscribe(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)

      const component = new Component($el, componentOptions)

      // debug
      // if (component.name) {
      //   window['c' + component.name] = component
      // }
      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  init() {
    console.log('env', process.env.NODE_ENV);
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }
  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}