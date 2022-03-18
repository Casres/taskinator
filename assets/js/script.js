var buttonEl = document.querySelector("#save-task");

console.log(buttonEl);

buttonEl.addEventListener("click", function(){
    // alert("button clicked");
    addTaskBtn();
});


function addTaskBtn() {

    var taskEL = document.querySelector("#list-items");
    var newTaskEl = document.createElement("li"); 
    // var userPrompt = window.prompt("what's your task?")

    // newTaskEl.userPrompt.textcontent(userPrompt);
    
    newTaskEl.className = "list-item-groups"; 
    taskEL.appendChild(newTaskEl);


}
