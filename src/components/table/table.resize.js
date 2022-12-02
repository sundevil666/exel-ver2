import {$} from '@core/dom';

export function tableResizeHandler($root, e) {
  const $resizer = $(e.target)
  const $parent = $resizer.closest('[data-type="resizeble"]')
  const cords = $parent.getCoords();
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  const type = $resizer.data.resize
  let value

  document.onmousemove = event => {
    $resizer.css({opacity: 1})
    if (type === 'col') {
      $resizer.css({height: '100vh'})
      const delta = event.pageX - cords.right;
      value = cords.width + delta
      $parent.css({width: value + 'px'})
    } else {
      $resizer.css({width: '100vh'})
      const delta = event.pageY - cords.bottom;
      value = cords.height + delta
      $parent.css({height: value + 'px'})
    }
  }

  document.onmouseup = () => {
    $resizer.css({opacity: '', height: '', width: ''})
    document.onmousemove = document.onmouseup = null
    if (type === 'col') {
      cells.forEach(el => el.style.width = value + 'px')
    } else {
      cells.forEach(el => el.style.height = value + 'px')
    }
  }
}