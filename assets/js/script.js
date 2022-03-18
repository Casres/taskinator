

var buttonEl = document.querySelector("#save-task");

function addTaskBtn() {
    
    var taskEL = document.querySelector("#list-items");
    var newTaskEl = document.createElement("li"); 
    
    newTaskEl.textContent = "New Task";
    newTaskEl.className = "task-item"; 
    taskEL.appendChild(newTaskEl);
    
}

buttonEl.addEventListener("click", function(){
    

    event.preventDefault();
    
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);

    event.preventDefault();
    
    addTaskBtn();

});
// Stop