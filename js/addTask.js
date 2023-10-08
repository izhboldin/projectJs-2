let tasks = [
    [],
    [],
    [],
    [],
];

getData();

const taskTitle = document.getElementById('task-text-name');
const taskBody = document.getElementById('task-text-body');
const taskComplexity = document.getElementById('task-text-complexity');
const taskTime = document.getElementById('task-text-time');
const taskTitleEdit = document.getElementById('task-text-name-edit');
const taskBodyEdit = document.getElementById('task-text-body-edit');
const taskComplexityEdit = document.getElementById('task-text-complexity-edit');
const taskTimeEdit = document.getElementById('task-text-time-edit');
const creatBtn = document.getElementById('send-btn');
const board = document.getElementById('board');

const addIdindex = (index) => {

    switch (index) {
        case 0:
            creatBtn.setAttribute('id', 'send-btn-0 send-btn');
            break;
        case 1:
            creatBtn.setAttribute('id', 'send-btn-1 send-btn');
            break;
        case 2:
            creatBtn.setAttribute('id', 'send-btn-2 send-btn');
            break;
        case 3:
            creatBtn.setAttribute('id', 'send-btn-3 send-btn');
            break;
    }
}

creatBtn.addEventListener('click', event => {
    event.preventDefault();
    if (taskTitle.value.trim() === '' || taskBody.value.trim() === '' || taskComplexity.value === '' || taskTime.value.trim() === '' || isNaN(taskTime.value.trim()) || !Number.isInteger(+taskTime.value.trim()) || taskTime.value.trim() <= 0 || taskTime.value.trim() > 90) {
        fieldsErrors(taskTitle, taskBody, taskComplexity, taskTime);
        return;
    }
    const task = {
        title: taskTitle.value.trim(),
        body: taskBody.value.trim(),
        complexity: taskComplexity.value,
        time: Math.floor((Date.now() + taskTime.value.trim() * 24 * 60 * 60 * 1000) / 1000),
    }
    cleanForm();
    tasks[creatBtn.id.split(' ')[0].split('-')[2]].push(task);
    saveTasks();
    showTask(tasks);
    fieldsComplet()
})

board.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList.contains('btn-remove') || event.target.classList.contains('svg-remove')) {
        const taskElements = event.target.closest('.board-column-element');
        const taskElement = event.target.closest('.board-column');
        const taskElementsIndex = taskElements.dataset.index;
        const taskElementIndex = taskElement.dataset.index;
        taskElement.remove();
        tasks[taskElementsIndex].splice(taskElementIndex, 1)
        saveTasks();
        showTask(tasks);
    }
    if (event.target.classList.contains('btn-edit') || event.target.classList.contains('svg-edit')) {
        const taskElements = event.target.closest('.board-column-element');
        const taskElement = event.target.closest('.board-column');
        const taskElementsIndex = taskElements.dataset.index;
        const taskElementIndex = taskElement.dataset.index;
        taskTitleEdit.value = tasks[taskElementsIndex][taskElementIndex].title;
        taskBodyEdit.value = tasks[taskElementsIndex][taskElementIndex].body;
        taskComplexityEdit.value = tasks[taskElementsIndex][taskElementIndex].complexity;
        // taskTimeEdit.value = tasks[taskElementsIndex][taskElementIndex].time;
        document.getElementById('update-task').addEventListener('click', (event) => {
            event.preventDefault();
            if (taskTitleEdit.value.trim() === '' || taskBodyEdit.value.trim() === '' || taskComplexityEdit.value === '' || taskTimeEdit.value.trim() === '' || isNaN(taskTimeEdit.value.trim()) || !Number.isInteger(+taskTimeEdit.value.trim()) || taskTimeEdit.value.trim() <= 0 || taskTimeEdit.value.trim() > 90) {
                fieldsErrors(taskTitleEdit, taskBodyEdit, taskComplexityEdit, taskTimeEdit);
                return;
            }
            tasks[taskElementsIndex][taskElementIndex].title = taskTitleEdit.value
            tasks[taskElementsIndex][taskElementIndex].body = taskBodyEdit.value
            tasks[taskElementsIndex][taskElementIndex].complexity = taskComplexityEdit.value
            tasks[taskElementsIndex][taskElementIndex].time = taskTimeEdit.value
            saveTasks();
            showTask(tasks);
        })
    }
    if (event.target.classList.contains('btn-execute') || event.target.classList.contains('svg-execute')) {
        const taskElements = event.target.closest('.board-column-element');
        const taskElement = event.target.closest('.board-column');
        const taskElementsIndex = taskElements.dataset.index;
        const taskElementIndex = taskElement.dataset.index;
        taskElement.remove();
        const task = {
            title: tasks[taskElementsIndex][taskElementIndex].title,
            body: tasks[taskElementsIndex][taskElementIndex].body,
            complexity: tasks[taskElementsIndex][taskElementIndex].complexity,
            time: tasks[taskElementsIndex][taskElementIndex].time,
        }
        tasks[3].push(task);
        tasks[taskElementsIndex].splice(taskElementIndex, 1)
        saveTasks();
        showTask(tasks);
    }
    if ((event.target.classList.contains('board-column') || event.target.classList.contains('board-column-text'))) {
        const taskElements = event.target.closest('.board-column-element');
        const taskElement = event.target.closest('.board-column');
        readTask(taskElements.dataset.index, taskElement.dataset.index)
    }
})

const cleanForm = () => {
    taskTitle.value = '';
    taskBody.value = '';
    taskComplexity.value = '';
    taskTime.value = '';
}

const showTask = tasks => {
    tasks.forEach((element, indexGlobal) => {
        let out = '';
        if (element != '') {
            element.forEach((task, index) => {
                if (indexGlobal === 3) {
                    out +=
                        `<div class="board-column p-2 border rounded-1 m-2" data-index="${index}" draggable="true" style="cursor: grab;">
                                    <div data-bs-toggle="modal" data-bs-target="#readModal"> 
                                        <p class="mb-2 text-decoration-line-through text-secondary board-column-text">${truncate(task.title, 30)}</p>
                                    </div>
                                    <div class="btn-group board-column-btn" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" class="btn  btn-sm btn-remove" >${removeSvg}</button>
                                    </div>
                                    <span class="badge text-bg-secondary">${task.complexity}</span>
                                </div>`
                }
                else {
                    out +=
                        `<div class="board-column p-2 border border-primary rounded-1 m-2" data-index="${index}" draggable="true" style="cursor: grab;">
                                <div data-bs-toggle="modal" data-bs-target="#readModal"> 
                                    <p class="mb-2 board-column-text">${truncate(task.title, 30)}</p>
                                </div>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" class="btn  btn-sm btn-remove" >${removeSvg}</button>
                                    <button type="button" class="btn  btn-sm btn-edit" data-bs-toggle="modal" data-bs-target="#editModal">${editSvg}</button>
                                    <button type="button" class="btn  btn-sm btn-execute">${executeSvg}</button>
                                </div>
                                ${selectComplexity(task.complexity)}
                                ${getData(task.time)}
                                </div>`
                }
            });
            // <p class="d-inline">${getData(task.time)}</p>
            document.querySelector(`.board-column-element-${indexGlobal}`).innerHTML = out;
            setDrag();
        }
        else {
            document.querySelector(`.board-column-element-${indexGlobal}`).innerHTML = out;
        }
    });
}

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadComments = () => {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        showTask(tasks);
    }
}

loadComments();

const fieldsErrors = (title, body, complexity, time) => {
    document.querySelectorAll('.alert-modal-error').forEach((el) => el.classList.remove('d-none'));
    if (title.value.trim() === '') {
        fieldError(title);
    }
    if (body.value.trim() === '') {
        fieldError(body);
    }
    if (complexity.value.trim() === '') {
        fieldError(complexity);
    }
    if (time.value.trim() === '' || isNaN(time.value.trim()) || !Number.isInteger(+time.value.trim()) || taskTime.value.trim() <= 0 || taskTime.value.trim() > 90) {
        fieldError(time);
    }
}

const fieldError = field => {
    field.classList.add('position-relative', 'border-danger');
    setTimeout(function () {
        field.classList.remove('position-relative', 'border-danger');
        document.querySelectorAll('.alert-modal-error').forEach((el) => el.classList.add('d-none'));

    }, 1500);
}

const fieldsComplet = () => {
    document.querySelectorAll('.alert-modal-success').forEach((el) => el.classList.remove('d-none'));
    setTimeout(function () {
        document.querySelectorAll('.alert-modal-success').forEach((el) => el.classList.add('d-none'));

    }, 1500);
}



const readTask = (index1, index2) => {
    document.getElementById('readModal').querySelector('.modal-title').innerHTML = tasks[index1][index2].title;
    document.getElementById('readModal').querySelector('.modal-body-inside').innerHTML = `Описание: ${tasks[index1][index2].body}`;
    document.getElementById('readModal').querySelector('.modal-info').innerHTML = `Времени осталось для выполнения: ${getData(tasks[index1][index2].time)}`;
}

