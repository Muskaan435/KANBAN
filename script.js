let tasksData = {}; // Object to store tasks for each column (todo, progress, done) for localStorage

// Selecting the three columns
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

let draggedElement = null; // To keep track of the task being dragged

// Modal and buttons

const toggleModalButton =document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg");
const addTaskButton = document.querySelector("#add-new-button");

// Array of all columns for easy iteration
const columns = [todo, progress, done];

// Selecting existing tasks (loaded in HTML initially, if any)
const tasks = document.querySelectorAll('.task');


// Function to create a new task in a given column
function addTask(title, desc, column){
    const div = document.createElement("div");            
    div.classList.add("task");
    div.setAttribute("draggable","true");
    div.innerHTML=`
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-button">Delete</button>
    `;
    column.appendChild(div);  // append task to column

    div.addEventListener("dragstart", (e)=>{
        draggedElement = div;
    })

    // Delete button for this task
    const deleteButton = div.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        div.remove(); // remove task from DOM
        columns.forEach(col => updateTaskCount(col));// update counts in all columns
        saveTasks(); // update localStorage
    })

    return div; // return task div for further use
}

// Function to update the task count displayed for a column
function updateTaskCount(column){
    const tasks = column.querySelectorAll(".task"); // get all tasks in column
    const count = column.querySelector(".right");  // element showing count
    count.innerHTML = tasks.length;  // update count
}

// Function to save all tasks in localStorage
function saveTasks(){
    tasksData = {};  // reset tasksData
    columns.forEach(col=>{
        const tasks = col.querySelectorAll(".task");
        // Store title and description of all tasks for this column
        tasksData[col.id] = Array.from(tasks).map(t=>({
            title: t.querySelector("h2").innerText,
            desc: t.querySelector("p").innerText
        }));
    });
    localStorage.setItem("tasks", JSON.stringify(tasksData)); // save to localStorage
}

// Load tasks from localStorage if available
if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));

    for(const col in data){
        const column = document.querySelector(`#${col}`);  // get column by ID
        data[col].forEach(task =>{
            addTask(task.title, task.desc, column); // recreate each task
        })

        updateTaskCount(column); // update count for this column
    }
}

tasks.forEach(tasks => {
    tasks.addEventListener("dragstart", (e) => {
        draggedElement = tasks;
    })
})

// Function to add drag-and-drop event listeners to a column
function addDragEvent(column){
    // When a task enters a column
    column.addEventListener("dragenter", (e) =>{
        e.preventDefault();
        column.classList.add("hover-over"); // highlight column
    })

    // When a task leaves a column
    column.addEventListener("dragleave", (e) =>{
        column.classList.remove("hover-over"); // remove highlight
    })

     // Allow dragging over the column
    column.addEventListener("dragover", (e) =>{
        e.preventDefault();
    })

    // When a task is dropped in the column
    column.addEventListener("drop", (e) =>{
        e.preventDefault();
        column.appendChild(draggedElement); // move task to this column
        column.classList.remove("hover-over");
        //count of tasks
        columns.forEach(col =>{ // update counts for all col
            updateTaskCount(col);
        })
        saveTasks();  // update localStorage after drop
    })
}

// Modal open/close logic
toggleModalButton.addEventListener("click", ()=>{
    modal.classList.toggle("active"); // toggle modal visibility
} )

modalBg.addEventListener("click" ,()=>{
    modal.classList.remove("active");  // close modal when background clicked
})

// Add new task when user clicks "Add" button
addTaskButton.addEventListener("click", ()=>{
    const TaskTitle = document.querySelector("#task-title-input").value;
    const TaskDescription = document.querySelector("#task-description-input").value;
    

    addTask(TaskTitle, TaskDescription, todo); // always add new tasks to TODO column
    columns.forEach(col =>{
            updateTaskCount(col); // update counts
        }
    )

    modal.classList.remove("active"); // close modal after adding task

    // Reset task title and description inputs so form is ready for next task
    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-description-input").value = "";

    saveTasks(); // save new task to localStorage
})

// Attach drag-and-drop functionality to all columns
addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);