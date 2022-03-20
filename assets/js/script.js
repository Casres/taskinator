





// this represents the colum lists that hold the tasks
var pageContentEl = document.querySelector("#page-content");

// this is the entire form 
var formEl = document.querySelector("#task-form");

// this reps the list that the tasks go into
var tasksToDoEl = document.querySelector("#list-items");

var taskIdCounter = 0;

// this captures the input from the user
var taskFormHandler = function(event) {

    // --Idk what this does, like I have a rough idea but nothing substantial-- 
    event.preventDefault();
    
    // what task the user puts in
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    console.log(taskNameInput);
    
    // the type of task that they pick from the options pop down menu
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);

    if(!taskNameInput || !taskTypeInput) {
        alert("Plaese fill out both forms");
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
            type: taskTypeInput
        };
        
    }

    createTaskEl(taskDataObj);

    // this resets the form when something is added
    formEl.reset();

};

var completeEditTask = function(taskName, taskType, taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new vaules
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

};

// the input from the user is received here and turns it into a list item in html through js (dynamically) 
var createTaskEl = function(taskDataObj) {

    
    // this creates an list element 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // listItemEl.textContent = taskNameInput;
    
    // add task ID as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // this creates a div element 
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    
    // this adds the task name and task type into the dynamically generated html task item
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    
    // this attachest the task type to the task
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    
    // this attatches the the task to the ul element, putting it in the grey area for the list
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
    console.log(taskId);
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");


    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;


    var taskType = taskSelected.querySelector("span.task-type").textContent;
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
    else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};


pageContentEl.addEventListener("click", taskButtonHandler);


