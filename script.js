document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Добавление задачи
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

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

        // Удаление задачи
        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
        });

        // Отметка выполнения
        li.querySelector('input').addEventListener('change', (e) => {
            li.style.textDecoration = e.target.checked ? 'line-through' : 'none';
        });

        taskList.appendChild(li);
        taskInput.value = '';
    }
});
