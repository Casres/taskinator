



var tasks = []; 



// this represents the colum lists that hold the tasks
var pageContentEl = document.querySelector("#page-content");

// this is the entire form 
var formEl = document.querySelector("#task-form");

// this reps the list that the tasks go into
var tasksToDoEl = document.querySelector("#list-items");

// task in progress list colum list
var tasksInProgressEl = document.querySelector("#tasks-in-progress");

// tasks completed could list
var tasksCompletedEl = document.querySelector("#tasks-completed");

// gives a dynamically generated task an Id #
var taskIdCounter = 0;

// this captures the input from the user
var taskFormHandler = function(event) {

    // this stops the page from reloading?? Idk...
    event.preventDefault();
    
    // what task the user puts in
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    console.log(taskNameInput);
    
    // the type of task that they pick from the options pop down menu
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);

    if(!taskNameInput || !taskTypeInput) {
        alert("Please fill out both forms");
        return false;
    }
    
    var isEdit = formEl.hasAttribute("data-task-id");
    

    if(isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
    
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput , 
            type: taskTypeInput ,
            status: "to do"
        };
        createTaskEl(taskDataObj);
        
    }

    // this resets the form when something is added
    formEl.reset();

};


var completeEditTask = function(taskName, taskType, taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new vaules
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) { 
          tasks[i].name = taskName;
          tasks[i].type = taskType;
        }
    };

    saveTasks();
   

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

};

// the input from the user is received here and turns it into a list item in html through js (dynamically) 
var createTaskEl = function(taskDataObj) {
    
    // this creates a list element 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    // add task ID as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // this creates a div element 
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    
    // this adds the task name and task type into the dynamically generated html task item
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    
    // this attaches the task type to the task
    listItemEl.appendChild(taskInfoEl);

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    saveTasks();

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    
    // this attaches the the task to the ul element, putting it in the grey area for the list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique ID
    taskIdCounter++;


}


// the 'edit' , 'delete' and 'task type' buttons
var createTaskActions = function(taskId) {

    // this makes them a <div> element
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // the edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // the delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // this is the drop down menu for the task type, and what ever the outcome gets an ID
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    
    actionContainerEl.appendChild(statusSelectEl);

    // the array of choices for the task type drop down button
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element 
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl)
    }

    return actionContainerEl;
    
};

// this runs the dynamic list
formEl.addEventListener("submit", taskFormHandler);

var deleteTask = function(taskId) {
    
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    
    var deleteTask = function(taskId) {
    
     var updatedTaskAry = [];
    
     for (var i = 0; i < tasks.length; i++) {
         // if tasks[i].id doesn't match the value of taskId, keep the task and push it into the new array
         if (tasks[i].id !== parseInt(taskId)) {
             updatedTaskAry.push(tasks[i]);
         }
     }
    
     tasks = updatedTaskAry;
    
    }

saveTasks();

}


var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    // get content from task name and type
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // these update the task
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "save-task";


    formEl.setAttribute("data-task-id", taskId);

}

var taskButtonHandler = function(event) {
    console.log(event.target);

    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches('.edit-btn')) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        // get the element's task Id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
        // console.log(taskId);
        console.log("delete button hit");
    }
};

var taskStatusChangeHandler = function(event) {

    // get the task item's Id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the Id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // attaching the items to the parent element of the list that they reside in
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
      
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            taskId[i].status = statusValue;
        }
    }

saveTasks();

};

var saveTasks = function () {

    localStorage.setItem("tasks", JSON. stringify(tasks));

}

var loadTasks = function () { 
    // gets tasks form local storage
    localStorage.getItem("tasks");
    console.log("can you here me now mr.krabs");
    
    // Converts tasks from the sting format back into an array of objects
    tasks = JSON.parse(tasks);
    console.log(tasks);

    // iterates through a tasks array and creates task elements on the page from it

 }

pageContentEl.addEventListener("click", taskButtonHandler);


pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();