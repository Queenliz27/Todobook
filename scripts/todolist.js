// Array to store todos (each with name + date)
const todos = [];

// On load, set up event listener
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('.js-add-button');
  addBtn.addEventListener('click', addTodo);

  // Also allow pressing Enter in the text input to add
  const textInput = document.querySelector('.js-todo-text');
  textInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  renderTodos();
});

function renderTodos() {
  const container = document.querySelector('.js-todo-list');
  container.innerHTML = '';  // clear existing

  // For each todo, build an element
  todos.forEach((todo, index) => {
    const item = document.createElement('div');
    item.className = 'todo-item';

    // Info block
    const info = document.createElement('div');
    info.className = 'info';

    const nameEl = document.createElement('div');
    nameEl.className = 'task-name';
    nameEl.textContent = todo.name;

    const dateEl = document.createElement('div');
    dateEl.className = 'due-date';
    if (todo.date) {
      // Format date (YYYY-MM-DD) or any nicer format
      dateEl.textContent = `Due: ${todo.date}`;
    } else {
      dateEl.textContent = 'No due date';
    }

    info.appendChild(nameEl);
    info.appendChild(dateEl);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      deleteTodo(index);
    });

    item.appendChild(info);
    item.appendChild(delBtn);

    container.appendChild(item);
  });
}

function addTodo() {
  const textInput = document.querySelector('.js-todo-text');
  const dateInput = document.querySelector('.js-todo-date');

  const name = textInput.value.trim();
  const date = dateInput.value;  // string in format YYYY-MM-DD

  if (!name) {
    // don’t add empty names
    return;
  }

  // Push new todo object
  todos.push({
    name: name,
    date: date
  });

  // Clear inputs
  textInput.value = '';
  dateInput.value = '';

  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}