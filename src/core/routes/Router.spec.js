import {Router} from './Router';
import {Page} from '../Page';

class DashboardPage extends Page {
  getRoot () {
    const root = document.createElement('div')
    return root.innerHTML = 'dashboard'
  }
}
class ExcelPage extends Page {}

describe('Router:', () => {
  let router = null
  let $root = null

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })
  test('should render Dashboard Page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})