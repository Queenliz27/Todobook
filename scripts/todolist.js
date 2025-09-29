// Array to store todos (each with name + due datetime)
const todos = [];

// On load
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('.js-add-button');
  addBtn.addEventListener('click', addTodo);

  const textInput = document.querySelector('.js-todo-text');
  textInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  // Run a check every 1 second
  setInterval(checkExpiredTodos, 1000);

  renderTodos();
});

function renderTodos() {
  const container = document.querySelector('.js-todo-list');
  container.innerHTML = '';

  todos.forEach((todo, index) => {
    const item = document.createElement('div');
    item.className = 'todo-item';

    const info = document.createElement('div');
    info.className = 'info';

    const nameEl = document.createElement('div');
    nameEl.className = 'task-name';
    nameEl.textContent = todo.name;

    const dateEl = document.createElement('div');
    dateEl.className = 'due-date';
    if (todo.date) {
      const dt = new Date(todo.date);
      dateEl.textContent = `Due: ${dt.toLocaleString()}`;
    } else {
      dateEl.textContent = 'No due date';
    }

    info.appendChild(nameEl);
    info.appendChild(dateEl);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteTodo(index));

    // If expired, strike through and disable button
    if (todo.expired) {
      nameEl.style.textDecoration = "line-through";
      delBtn.disabled = true;
      delBtn.style.opacity = "0.5";
      delBtn.style.cursor = "not-allowed";
    }

    item.appendChild(info);
    item.appendChild(delBtn);

    container.appendChild(item);
  });
}

function addTodo() {
  const textInput = document.querySelector('.js-todo-text');
  const dateInput = document.querySelector('.js-todo-date');

  const name = textInput.value.trim();
  const date = dateInput.value; // YYYY-MM-DDTHH:mm

  if (!name) return;

  todos.push({
    name: name,
    date: date,
    expired: false
  });

  textInput.value = '';
  dateInput.value = '';

  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function checkExpiredTodos() {
  const now = new Date();

  todos.forEach(todo => {
    if (todo.date && !todo.expired) {
      const dueDate = new Date(todo.date);
      if (now >= dueDate) {
        todo.expired = true;
      }
    }
  });

  renderTodos();
}
