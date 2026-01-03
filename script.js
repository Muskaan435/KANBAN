const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let draggedElement = null;

const tasks = document.querySelectorAll('.task');

tasks.forEach(tasks => {
    tasks.addEventListener("drag", (e) => {
        draggedElement = tasks;
    })
})

function addDragEvent(column){
    column.addEventListener("dragenter", (e) =>{
        e.preventDefault();
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave", (e) =>{
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover", (e) =>{
        e.preventDefault();
    })
    column.addEventListener("drop", (e) =>{
        e.preventDefault();
        column.appendChild(draggedElement);
        column.classList.remove("hover-over");

    })
}
addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);