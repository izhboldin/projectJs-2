const truncate = (str, maxlength) => str.length > maxlength ? (str.slice(0, maxlength) + '...') : str;

const selectComplexity = (compl) => {
    if(compl === 'Eazy') {
        return `<span class="badge rounded-pill text-bg-success text-dark  me-4">${compl}</span>`
    }
    if(compl === 'Medium') {
        return `<span class="badge rounded-pill text-bg-warning me-2">${compl}</span>`
    }
    if(compl === 'Hard') {
        return `<span class="badge rounded-pill text-bg-danger text-dark  me-4">${compl}</span>`
    }
}

const zone1 = document.querySelector('.board-column-element-0');
const zone2 = document.querySelector('.board-column-element-1');
const zone3 = document.querySelector('.board-column-element-2');
const zone4 = document.querySelector('.board-column-element-3');

zone1.ondragover = allowDrop;
zone2.ondragover = allowDrop;
zone3.ondragover = allowDrop;
zone4.ondragover = allowDrop;

function allowDrop(event) {
    event.preventDefault();
}

const setDrag = () => document.querySelectorAll('.board-column').forEach(el => el.ondragstart = drag);


zone1.ondrop = drop;
zone2.ondrop = drop;
zone3.ondrop = drop;
zone4.ondrop = drop;

function drag(event) {
    event.dataTransfer.setData('index', event.target.dataset.index);
    event.dataTransfer.setData('indexG', event.target.closest('.board-column-element').dataset.index);
}

function drop(event) {
    let itemIndex = event.dataTransfer.getData('index');
    let itemsIndex = event.dataTransfer.getData('IndexG');

    if(itemIndex == '' || itemsIndex == ''){
        return
    }

    if (event.target.className.split(' ')[1] === 'board-column-element') {
        tasks[event.target.dataset.index].push(tasks[itemsIndex][itemIndex]);
        tasks[itemsIndex].splice(itemIndex, 1);
        saveTasks();
        showTask(tasks);
    }
}
