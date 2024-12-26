const API_URL = 'https://67697d4f863eaa5ac0dbd1ce.mockapi.io/ToDo/todos';

// Получаем идентификатор пользователя из localStorage
const userId = localStorage.getItem('user_id');
if (!userId) {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    window.location.href = '/login.html';
}

async function fetchTodos() {
    try {
        // Загружаем только задачи текущего пользователя
        const response = await fetch(`${API_URL}?userId=${userId}`);
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (!text) return;

    const newTodo = {
        text,
        completed: false,
        userId, // Привязываем задачу к текущему пользователю
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });
        if (response.ok) {
            input.value = '';
            fetchTodos();
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function toggleTodo(todoId, currentStatus) {
    try {
        await fetch(`${API_URL}/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !currentStatus }),
        });
        fetchTodos();
    } catch (error) {
        console.error('Error toggling todo:', error);
    }
}

async function deleteTodo(todoId) {
    try {
        await fetch(`${API_URL}/${todoId}`, {
            method: 'DELETE',
        });
        fetchTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = todos
        .map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" 
                       class="todo-checkbox" 
                       ${todo.completed ? 'checked' : ''} 
                       onchange="toggleTodo(${todo.id}, ${todo.completed})">
                <span class="todo-text">${todo.text}</span>
                <button onclick="deleteTodo(${todo.id})" class="delete-btn">×</button>
            </li>
        `).join('');
}

document.getElementById('todoInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

document.addEventListener('DOMContentLoaded', fetchTodos);
