document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Add task event listener
    addTaskBtn.addEventListener('click', () => addTask(taskInput.value));
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(taskInput.value);
    });

    // Function to add a task
    function addTask(taskText, save = true) {
        // Trim the input and check for empty tasks
        taskText = taskText.trim();
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create task list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Add remove button to task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => removeTask(li, taskText);
        li.appendChild(removeBtn);

        // Append task to list
        taskList.appendChild(li);

        // Save task to Local Storage
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear input field
        taskInput.value = '';
    }

    // Function to remove a task
    function removeTask(taskElement, taskText) {
        // Remove from DOM
        taskList.removeChild(taskElement);

        // Remove from Local Storage
        removeTaskFromLocalStorage(taskText);
    }

    // Save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskText => addTask(taskText, false));
    }
});
