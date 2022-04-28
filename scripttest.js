let data = [];
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/checkboxData1');
xhr.responseType = 'json';
xhr.send();

xhr.onerror = function() { // происходит, только когда запрос совсем не получилось выполнить
    console.log(`Ошибка соединения`);
  };
  
  xhr.onprogress = function(event) { // запускается периодически
    // event.loaded - количество загруженных байт
    // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
    // event.total - количество байт всего (только если lengthComputable равно true)
    console.log(`Загружено ${event.loaded} из ${event.total}`);
  };

xhr.onload = function(){
    data = xhr.response;
    create();
}

const select = document.getElementById('filter');
const list = document.getElementById('list');

function clearAll() {
  list.innerHTML = " ";
}

function create() {
  const filter = select.value;
  const filtered = filtration(data, filter);
  clearAll();
  list.append(createInputsList(filtered));
}

select.addEventListener('change', create);

function filtration(arr, filter) {
  switch (filter) {
    case "all_list": 
      return arr;

    case "ready_list":
      return arr.filter(function(ready) {
        return ready.ready === true;
      });
      
    case "not_ready_list":
      return arr.filter(function(ready) {
        return ready.ready === false;
      });
      
    default: 
      return arr;
  }
}

const createInputRow = ({
  id,
  text,
  ready
}) => {
  const wrapper = document.createElement('div');
  wrapper.append(createCheckboxEl(id, ready), createLabelEl(id, text));

  return wrapper
}

const createLabelEl = (id, text) => {
  const label = document.createElement('label');
  label.htmlFor = id;
  label.innerText = text;
  label.className = "label1";
  
  return label
}

function fn(event) {
  let id = event.target.id - 1;
  data[id].ready = !data[id].ready;

  create();

  return;
 }

const createCheckboxEl = (id, ready) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.checked = ready;
  checkbox.className = "check1";

  checkbox.addEventListener('change', fn);

  return checkbox;
}

const createInputsList = (inputsData) => {
    const wrapper = document.createElement('div');
    for (const item of inputsData) {
      wrapper.append(createInputRow(item));
    }
    return wrapper;
  }

list.append(createInputsList(data))