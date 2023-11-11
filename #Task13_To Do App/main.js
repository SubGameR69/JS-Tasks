let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// array to store tasks
let taskArray = [];

// check if there are tasks in local storage
if (localStorage.getItem("tasks")){
    taskArray = JSON.parse(localStorage.getItem("tasks"));
}

// trigger get data from local
getDataFromLocal();

// Add task
submit.onclick = function () {
    if (input.value != "") {
        addTaskToArray(input.value); // Add task to array of tasks
        input.value = "";
    }
}

// click on task element
taskDiv.addEventListener("click", (e)=>{
    // delete btn
    if(e.target.classList.contains("del")){
        // remove element from local storage
        deleteTask(e.target.parentElement.getAttribute("data-id"));
        // remove element from the page
        e.target.parentElement.remove()
    }
    // task element
    if (e.target.classList.contains("task")){
        // toggle completion of the task
        toggleStatus(e.target.getAttribute("data-id"));
        // toggle done class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(text) {
    // Task Data
    const task = {
        id : Date.now(),
        title : text,
        completed : false
    }

    // push task to taskArray
    taskArray.push(task);

    // add tasks to page from the tasksArray
    addTaskToPage(taskArray);

    // add tasks to local storage
    addToLocal(taskArray);
}

function addTaskToPage(array) {
    // clear the tasks div
    taskDiv.innerHTML = "";
    // Looping through the taskArray
    array.forEach((task) => {
        // create the task div
        let div = document.createElement("div");
        div.className = "task";
        // check if task is done
        if (task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // add and create the delete btn
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);

        // add task div to the tasks
        taskDiv.appendChild(div);
    })
}


function addToLocal(array) {
    window.localStorage.setItem("tasks", JSON.stringify(array))
}

function getDataFromLocal() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addTaskToPage(tasks);
    }
}

function deleteTask(taskId){
    // for (let i=0; i < taskArray.length; i++) {
    //     console.log(`${taskArray[i].id} ==== ${taskId}`);
    // }
    taskArray = taskArray.filter((task) => task.id != taskId)
    addToLocal(taskArray);
}


function toggleStatus(taskId) {
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id == taskId) {
        taskArray[i].completed == false ? (taskArray[i].completed = true) : (taskArray[i].completed = false);
        }
    }
    addToLocal(taskArray);
}
