const form = document.querySelector('.form')
const list = document.querySelector('.list')

// Редактируемая задача
// TODO: должна называться currentIdEditTask
let currentIdEditTask = null

// Массив обьектов списка задач с id и текстом. Добавляется каждая задача в виде обьекта.
let todos = []

// Событие Добавление в Список ToDo
form.addEventListener('submit', addTodo)

// Событие на кнопки Редактировать и Удалить
// TODO: вынести логику из addEventListener в отдельную ф-ю
list.addEventListener('click', (e) => {
  const btnElements = e.target.closest('.list__btns')
  if (!btnElements) return
  if (e.target.closest('.list__buttonDelete')) {
    deleteTodo(e)
  } else if (e.target.closest('.list__buttonEdit')) {
    EditTodo(e)
  }
})

function addTodo(e) {
  e.preventDefault()
  const id = Date.now()
  const text = e.target[0].value
  // TODO: можно выводить alert
  if (!text) return
  todos.push({
    id,
    text,
  })
  // TODO: заменить input на button
  // TODO: генерацию разметки для item можно вынести в отдельную ф-ю и также использовать ее потом в renderTasks
  const item = `<div class="task"id="${id}">
    <li>${text}
    <div class="list__btns">
    <input type="button" class="button list__buttonEdit"value="Ред">
    <input type="button" class="button list__buttonDelete" value="Удалить">
    </div>
    </li>`
  list.innerHTML += item
  localStorageSet()
  form.reset()
}
function deleteTodo(e) {
  e.preventDefault()
  currentIdEditTask = e.target.closest('.task')
  let id = Number(currentIdEditTask.id)
  todos = todos.filter((item) => item.id !== id)
  document.getElementById(id).remove()
  /* TODO: здесь не нужно вызывать renderTasks 
    нужно удалять конкретную запись по id
  */
  localStorageSet()
  renderTasks()
}

// TODO: название с маленькой буквы
function EditTodo(e) {
  e.preventDefault()
  currentIdEditTask = e.target.closest('.task')
  let id = Number(currentIdEditTask.id)
  // TODO: вместо findIndex можно использовать find. Переменнную index переименовать в item
  let index = todos.findIndex((item) => id === item.id)
  // TODO: это не нужно
  let textInput = todos[index].text
  // TODO: убрать динамическую генерацию модалки
  let modal = `<div class="modal">
  <form class="modalForm">
    <input name="input" type="text" class="input modal__input" value="${textInput}" />
    <button class="button modal__button">Сохранить</button>
  </form>
  </div>`
  document.body.innerHTML += modal
  const modalForm = document.querySelector('.modalForm')
  // TODO: вынести modalForm.addEventListener из EditTodo
  modalForm.addEventListener('submit', function (e) {
    e.preventDefault()
    todos[index].text = modalForm.input.value
    document.querySelector('.modal').style.display = 'none'
    localStorageSet()
    currentIdEditTask = null
  })
}
// Функция записывает в localStorage данные
function localStorageSet() {
  localStorage.setItem('tasks', JSON.stringify(todos))
}
// Функция чтение из localStorage Данных
function localStorageGet() {
  let todosArray = localStorage.getItem('tasks')
  if (todosArray) {
    todos = JSON.parse(todosArray)
  }
  // TODO: здесь не нужно вызывать renderTasks
  renderTasks()
}
function renderTasks() {
  list.innerHTML = ''
  // Пробегаемся циклом по обьектам массива и вставляем их в список.
  todos.forEach((value) => {
    const { id, text } = value // Деструкторизация
    const item = `<div class="task"id="${id}">
    <li>${text}
    <div class="list__btns">
    <input type="button" class="button list__buttonEdit"value="Ред">
    <input type="button" class="button list__buttonDelete"value="Удалить">
    </div>
    </li>`
    // TODO: заменить insertAdjacentHTML на innerHtml
    document.querySelector('.list').insertAdjacentHTML('beforeEnd', item)
  })
}

// localStorageGet
// renderTasks
localStorageGet()
