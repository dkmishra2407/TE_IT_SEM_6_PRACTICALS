// Simulated server storage (in a real application, this would be a database)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage (simulating server storage)
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (!taskText) {
        alert('Please enter a task');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Simulate AJAX POST request
    setTimeout(() => {
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }, 300);
}

// Function to delete a task
function deleteTask(taskId) {
    // Simulate AJAX DELETE request
    setTimeout(() => {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }, 300);
}

function toggleTask(taskId) {
    // Simulate AJAX PUT request
    setTimeout(() => {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasks();
        renderTasks();
    }, 300);
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newText = prompt('Edit task:', task.text);
    
    if (newText && newText.trim()) {
        // Simulate AJAX PUT request
        setTimeout(() => {
            tasks = tasks.map(t => {
                if (t.id === taskId) {
                    return { ...t, text: newText.trim() };
                }
                return t;
            });
            saveTasks();
            renderTasks();
        }, 300);
    }
}

// Function to render all tasks
function renderTasks() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">
                    <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        todoList.appendChild(taskElement);
    });
}

// Add event listener for Enter key
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks(); 