











var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#list-items");
var taskTypeInput = document.querySelector("select[name='task-type']").value;
console.log(taskTypeInput);

var createTaskHandler = function(event) {

    event.preventDefault();

    
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    console.dir(taskNameInput);


    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-item";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    tasksToDoEl.appendChild(listItemEl);


    listItemEl.className = "task-item";
    listItemEl.textContent = taskNameInput;
    tasksToDoEl.appendChild(listItemEl);

  };
  

formEl.addEventListener("submit", createTaskHandler);

