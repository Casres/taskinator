

var formEl = document.querySelector("#task-form");

// this reps the list that the tasks go into
var tasksToDoEl = document.querySelector("#list-items");


var createTaskHandler = function(event) {

    // --Idk what this does, like I have a rough idea but nothing substantial-- 
    event.preventDefault();



    // what task the user puts in
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    console.log(taskNameInput);

    // the type of task that they pick from the options pop down menu
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);
    


    // this creates an list element 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // --this was adding extra words for some reason--
    // listItemEl.textContent = taskNameInput;



    // this creates a div element 
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // this adds the task type under what the task is
    // --this works like text.contebnt but you can addd HTML elements to it as shown below--
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";


    // this attachest the task type to the task
    listItemEl.appendChild(taskInfoEl);
    
    // this attatches the the task to the ul element, putting it in the grey area for the list
    tasksToDoEl.appendChild(listItemEl);

  };
  
// this runs the dynamic list
formEl.addEventListener("submit", createTaskHandler);

