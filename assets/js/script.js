

var buttonEl = document.querySelector("#save-task");

function addTaskBtn() {
    
    var taskEL = document.querySelector("#list-items");
    var newTaskEl = document.createElement("li"); 
    
    newTaskEl.textContent = "New Task";
    newTaskEl.className = "task-item"; 
    taskEL.appendChild(newTaskEl);
    
}

buttonEl.addEventListener("click", function(){
    
    addTaskBtn();

});
