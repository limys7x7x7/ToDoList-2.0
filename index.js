const form = document.querySelector('.form')
const list = document.querySelector('.list')

// Редактируемая задача
let currentIdEditTask = null

// Массив обьектов списка задач с id и текстом. Добавляется каждая задача в виде обьекта.
let todos = []

// Событие Добавление в Список ToDo
form.addEventListener('submit', addTodo)

// Событие на кнопки Редактировать и Удалить
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
  if (!text) return
  todos.push({
    id,
    text,
  })
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
  localStorageSet()
  renderTasks()
}
function EditTodo(e) {
  e.preventDefault()
  currentIdEditTask = e.target.closest('.task')
  let id = Number(currentIdEditTask.id)
  let index = todos.findIndex((item) => id === item.id)
  let textInput = todos[index].text
  let modal = `<div class="modal">
  <form class="modalForm">
    <input name="input" type="text" class="input modal__input" value="${textInput}" />
    <button class="button modal__button">Сохранить</button>
  </form>
  </div>`
  document.body.innerHTML += modal
  const modalForm = document.querySelector('.modalForm')
  modalForm.addEventListener('submit', function () {
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
    document.querySelector('.list').insertAdjacentHTML('beforeEnd', item)
  })
}
localStorageGet()
