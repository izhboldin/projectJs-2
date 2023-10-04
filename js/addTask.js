let tasks = [
    [],
    [],
    [],
    [],
]

const taskModalName = document.getElementById('task-text-name');
const taskModalBody = document.getElementById('task-text-body');
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
        fieldsErrors();
        console.log(creatBtn.id.split(' ')[0].split('-')[2])
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
    if (event.target.classList.contains('board-column') || event.target.classList.contains('board-column-text')) {

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
                    out +=
                        `<div class="board-column p-2 border rounded-1 m-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-index="${index}">
                        <p class="text-decoration-line-through text-secondary">${task.title}</p>
                    </div>`
                }
                else {
                    out +=
                        `<div class="board-column p-2 border border-primary rounded-1 m-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-index="${index}">
                    <p class="board-column-text">${task.title}</p>
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

fieldsErrors = () => {
    document.getElementById('modal-error').classList.remove('d-none')
    if (taskModalName.value === '') {
        fieldError(taskModalName);
    }
    if (taskModalBody.value === '') {
        fieldError(taskModalBody);
    }
}

fieldError = field => {
    field.classList.add('position-relative', 'border-danger');
    setTimeout(function () {
        field.classList.remove('position-relative', 'border-danger');
        document.getElementById('modal-error').classList.add('d-none')
    }, 1500);
}



const readTask = (index1, index2) => {
    document.getElementById('staticBackdrop').querySelector('.modal-title').innerHTML = tasks[index1][index2].title;
    document.getElementById('staticBackdrop').querySelector('.modal-body').innerHTML = tasks[index1][index2].body;
}