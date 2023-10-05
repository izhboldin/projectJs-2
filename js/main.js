const zone1 = document.querySelector('.board-column-element-0');
const zone2 = document.querySelector('.board-column-element-1');
const zone3 = document.querySelector('.board-column-element-2');
const zone4 = document.querySelector('.board-column-element-3');
const taskInZone = document.querySelectorAll('.board-column');
// console.log(taskInZone);

zone1.ondragover = allowDrop;
zone2.ondragover = allowDrop;
zone3.ondragover = allowDrop;
zone4.ondragover = allowDrop;

function allowDrop(event) {
    event.preventDefault();
}

taskInZone.forEach((el) => {
    el.ondragstart = drag;
})

zone1.ondrop = drop;
zone2.ondrop = drop;
zone3.ondrop = drop;
zone4.ondrop = drop;

function drag(event) {
    console.log(event.target)
    event.dataTransfer.setData('index', event.target.dataset.index);
    event.dataTransfer.setData('indexG', event.target.closest('.board-column-element').dataset.index);

}

function drop(event){
    let itemIndex = event.dataTransfer.getData('index');
    let itemsIndex = event.dataTransfer.getData('IndexG');

    // event.target.append()
    if(event.target.className.split(' ')[1] === 'board-column-element'){
       tasks[event.target.dataset.index].push(tasks[itemsIndex][itemIndex]);
       tasks[itemsIndex].splice(itemIndex, 1);
       saveTasks();
       showTask(tasks);
       location.reload();
    }
}
