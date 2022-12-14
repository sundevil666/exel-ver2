import {storage} from '@core/utils';

function toHtml(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
    <li class="db__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>
            ${new Date(model.openDate).toLocaleDateString()}
            ${new Date(model.openDate).toLocaleTimeString()}
        </strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordTable() {
  const keys = getAllKeys()
  console.log(keys);
  if (!keys.length) {
    return `<p>Record is empty</p>`
  }

  return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>

    <ul class="db__list">
        ${keys.map(toHtml).join('')}
    </ul>
  `
}

