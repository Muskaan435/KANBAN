const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let draggedElement = null;
const toggleModalButton =document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskButton = document.querySelector("#add-new-button");

const tasks = document.querySelectorAll('.task');

tasks.forEach(tasks => {
    tasks.addEventListener("dragstart", (e) => {
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
        //count of tasks
        [todo, progress, done].forEach(col =>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
            count.innerHTML = tasks.length;
        })
        //count of tasks
    })
}
//add task button logic
toggleModalButton.addEventListener("click", ()=>{
    modal.classList.toggle("active");
} )

modalBg.addEventListener("click" ,()=>{
    modal.classList.remove("active");
})

addTaskButton.addEventListener("click", ()=>{
    const TaskTitle = document.querySelector("#task-title-input").value;
    const TaskDescription = document.querySelector("#task-description-input").value;
    
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable","true");
    div.innerHTML=`
        <h2>${TaskTitle}</h2>
        <p>${TaskDescription}</p>
        <button id="delete-button">Delete</button>
    `;
    todo.appendChild(div);
    [todo, progress, done].forEach(col =>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
            count.innerHTML = tasks.length;
        })

    div.addEventListener("dragstart", (e)=>{
        draggedElement = div;
    } )
    modal.classList.remove("active");
})
//add task button logic
addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);