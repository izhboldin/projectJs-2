let tasks = [
    [],
    [],
    [],
    [],
];

const executeSvg = `<svg class="svg-execute" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<path d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const editSvg = `<svg class="svg-edit" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const removeSvg = `<svg class="svg-remove" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 17L16.8995 7.10051" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 7.00001L16.8995 16.8995" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const taskModalName = document.getElementById('task-text-name');
const taskModalBody = document.getElementById('task-text-body');
const taskModalNameEdit = document.getElementById('task-text-name-edit');
const taskModalBodyEdit = document.getElementById('task-text-body-edit');
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
    if (taskModalName.value === '' || taskModalBody.value === '') {
        fieldsErrors(taskModalName, taskModalBody);
        return;
    }
    const task = {
        title: taskModalName.value,
        body: taskModalBody.value,
    }
    cleanForm();
    tasks[creatBtn.id.split(' ')[0].split('-')[2]].push(task);
    saveTasks();
    showTask(tasks);
})

board.addEventListener('click', event => {
    event.preventDefault();
    console.log(event.target.classList.contains('svg-remove'));
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
        taskModalNameEdit.value = tasks[taskElementsIndex][taskElementIndex].title;
        taskModalBodyEdit.value = tasks[taskElementsIndex][taskElementIndex].body;
        document.getElementById('update-task').addEventListener('click', (event) => {
            event.preventDefault();
            if (taskModalNameEdit.value === '' || taskModalBodyEdit.value === '') {
                fieldsErrors(taskModalNameEdit, taskModalBodyEdit);
                return;
            }
            tasks[taskElementsIndex][taskElementIndex].title = taskModalNameEdit.value
            tasks[taskElementsIndex][taskElementIndex].body = taskModalBodyEdit.value
            saveTasks();
            showTask(tasks);
        })
        // taskElement.remove();
        // const task = {
        //     title: tasks[taskElementsIndex][taskElementIndex].title,
        //     body: tasks[taskElementsIndex][taskElementIndex].body,
        // }
        // tasks[3].push(task);
        // tasks[taskElementsIndex].splice(taskElementIndex, 1)
        // saveTasks();
        // showTask(tasks);
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
    taskModalName.value = '';
    taskModalBody.value = '';
}

const showTask = tasks => {
    tasks.forEach((element, indexGlobal) => {
        let out = '';
        if (element != '') {
            element.forEach((task, index) => {
                if (indexGlobal === 3) {
                    if(task.title.length)
                    out +=
                        `<div class="board-column p-2 border rounded-1 m-2" data-index="${index}" draggable="true">
                        <div data-bs-toggle="modal" data-bs-target="#readModal"> 
                            <p class="mb-2 text-decoration-line-through text-secondary board-column-text">${task.title}</p>
                        </div>
                        <div class="btn-group board-column-btn" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn  btn-sm btn-remove" >${removeSvg}</button>
                        </div>
                    </div>`
                }
                else {
                    out +=
                        `<div class="board-column p-2 border border-primary rounded-1 m-2" data-index="${index}" draggable="true">
                        <div data-bs-toggle="modal" data-bs-target="#readModal"> 
                            <p class="mb-2 board-column-text">${task.title}</p>
                        </div>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn  btn-sm btn-remove" >${removeSvg}</button>
                            <button type="button" class="btn  btn-sm btn-edit" data-bs-toggle="modal" data-bs-target="#editModal">${editSvg}</button>
                            <button type="button" class="btn  btn-sm btn-execute">${executeSvg}</button>
                        </div>
                    </div>`
                }
            });
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

const fieldsErrors = (Title, Body) => {
    document.querySelectorAll('.alert-modal-error').forEach((el)=> el.classList.remove('d-none'));
    if (Title.value === '') {
        fieldError(Title);
    }
    if (Body.value === '') {
        fieldError(Body);
    }
}

const fieldError = field => {
    field.classList.add('position-relative', 'border-danger');
    setTimeout(function () {
        field.classList.remove('position-relative', 'border-danger');
        document.querySelectorAll('.alert-modal-error').forEach((el)=> el.classList.add('d-none'));

    }, 1500);
}



const readTask = (index1, index2) => {
    document.getElementById('readModal').querySelector('.modal-title').innerHTML = tasks[index1][index2].title;
    document.getElementById('readModal').querySelector('.modal-body').innerHTML = tasks[index1][index2].body;
}
