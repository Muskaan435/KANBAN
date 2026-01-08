const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let draggedElement = null;
const toggleModalButton =document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg")

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
//add task logic
toggleModalButton.addEventListener("click", ()=>{
    modal.classList.toggle("active");
} )
//add task logic
modalBg.addEventListener("click" ,()=>{
    modal.classList.remove("active");
})
addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);