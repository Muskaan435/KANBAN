let tasksData = {};
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let draggedElement = null;
const toggleModalButton =document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskButton = document.querySelector("#add-new-button");
const columns = [todo, progress, done];
const tasks = document.querySelectorAll('.task');

function addTask(title, desc, column){
    const div = document.createElement("div");            
    div.classList.add("task");
    div.setAttribute("draggable","true");
    div.innerHTML=`
        <h2>${title}</h2>
        <p>${desc}</p>
        <button id="delete-button">Delete</button>
    `;
    column.appendChild(div);

    div.addEventListener("dragstart", (e)=>{
        draggedElement = div;
    })

    return div;
}

function updateTaskCount(column){
    const tasks = column.querySelectorAll(".task");
    const count = column.querySelector(".right");
    count.innerHTML = tasks.length;
}

function saveTasks(){
    tasksData = {};
    columns.forEach(col=>{
        const tasks = col.querySelectorAll(".task");
        tasksData[col.id] = Array.from(tasks).map(t=>({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));
    });
    localStorage.setItem("tasks", JSON.stringify(tasksData));
}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));

    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task =>{
            addTask(task.title, task.desc, column);
        })

        updateTaskCount(column);
    }
}

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
        columns.forEach(col =>{
            updateTaskCount(col);
        })
        //count of tasks
        saveTasks(); 
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
    
    addTask(TaskTitle, TaskDescription, todo);
    columns.forEach(col =>{
            updateTaskCount(col);
        }
    )

    div.addEventListener("dragstart", (e)=>{
        draggedElement = div;
    } )
    modal.classList.remove("active");
    saveTasks();
})
//add task button logic
addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);