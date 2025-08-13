const todoInput = document.querySelector('input');
const addButton = document.querySelector('button');
const todoList = document.querySelector('ul');

function addTodoDOM(todo) {
    // 새로운 li item 만들기
    const newTodoItem = document.createElement('li');
    newTodoItem.classList.add('flex-container');

    // 체크 박스 만들기
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // 삭제 버튼 만들기
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.classList.add('flex-delete-button');

    // 텍스트 만들기
    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = todo.text; // 받은 객체의 text 프로퍼티 사용

    // 만약 todo 객체가 'completed' 상태라면, 처음부터 반영해줍니다.
    if (todo.completed) {
        checkbox.checked = true;
        todoText.classList.add('completed');
    }

    newTodoItem.append(checkbox, todoText, deleteButton);
    todoList.appendChild(newTodoItem);
}

function saveTodos() {
    const todos = [];
    const todoItems = document.querySelectorAll('.flex-container');

    todoItems.forEach(item => {
        const text = item.querySelector('.todo-text').textContent;
        const completed = item.querySelector('input[type="checkbox"]').checked;
        todos.push({ text, completed });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos !== null) {
        const parsedTodos = JSON.parse(savedTodos);
        parsedTodos.forEach(todo => {
            addTodoDOM(todo);
        });
    }
}

todoList.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('flex-delete-button')) { // delete btn
        const liToDelete = target.closest('li');
        // 그 <li>를 삭제한다
        liToDelete.remove();
        saveTodos();
    }
    if (target.type === 'checkbox') {
        const spanToComplete = target.nextElementSibling;
        if (spanToComplete)
            spanToComplete.classList.toggle('completed');
        saveTodos();
    }
})

addButton.addEventListener('click', (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작 막기
    if (todoInput.value.trim() === '') return; // 입력값이 없으면 추가하지 않음

    const newTodo = { text: todoInput.value, completed: false };
    addTodoDOM(newTodo);

    todoInput.value = '';
    saveTodos();
})

// --- 스크립트가 처음 실행될 때, 저장된 데이터를 불러옵니다. ---
loadTodos();