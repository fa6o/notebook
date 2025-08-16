document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const clearBtn = document.getElementById('clearBtn'); // Новая кнопка
    const taskList = document.getElementById('taskList');

    // Загружаем задачи при старте
    loadTasks();

    // Добавление задачи
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Очистка списка
    clearBtn.addEventListener('click', clearAllTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <span class="delete">✕</span>
        `;

        // Удаление одной задачи
        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            saveTasks(); // Обновляем хранилище
        });

        // Отметка выполнения
        li.querySelector('input').addEventListener('change', (e) => {
            li.style.textDecoration = e.target.checked ? 'line-through' : 'none';
            saveTasks(); // Обновляем хранилище
        });

        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks(); // Сохраняем всё
    }

    // Сохраняем задачи в localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList .task').forEach(task => {
            tasks.push({
                text: task.querySelector('span').textContent,
                completed: task.querySelector('input').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Загружаем задачи из localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task';
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.text}</span>
                <span class="delete">✕</span>
            `;
            if (task.completed) li.style.textDecoration = 'line-through';

            // Вешаем обработчики
            li.querySelector('.delete').addEventListener('click', () => {
                li.remove();
                saveTasks();
            });
            li.querySelector('input').addEventListener('change', (e) => {
                li.style.textDecoration = e.target.checked ? 'line-through' : 'none';
                saveTasks();
            });

            taskList.appendChild(li);
        });
    }

    // Очистка всего списка
    function clearAllTasks() {
        if (confirm('Удалить все задачи?')) {
            taskList.innerHTML = '';
            localStorage.removeItem('tasks');
        }
    }
});
// В коде удаления:
li.classList.add('removing');
setTimeout(() => li.remove(), 300);
