// when refresh it take the info from the local storage
window.addEventListener("DOMContentLoaded", e =>{
    arrLocal = JSON.parse(localStorage.getItem("omer"));
    printLocal(arrLocal);
});
//
let arrLocal = [];
let stringifiedTaskArr;
let viewSection = document.querySelector(".viewSection");
const prioritySelector = document.getElementById("priority-selector");
const counter = document.getElementById("counter");
const input = document.getElementById("text-input");
const add = document.getElementById("add-button");
const sort = document.getElementById("sort-button");
const taskArr = [];
let storageCounter;
count = localStorage.getItem("counter");
// adding the add event to add and sort button
add.addEventListener("click", doAdd);
sort.addEventListener("click", doSort)
///================functions=================
// the add event function ,add and updating the local storage the counter and tasks 
function doAdd(){
    let taskObj = {inputVal:'' ,taskDate:'' ,taskPriority:'' ,};
    let container = document.createElement("div");
    container.classList.add("todo-container");
    let taskText = document.createElement("div");
    taskText.classList.add("todo-text");
    let taskDate = document.createElement("div");
    taskDate.classList.add("todo-created-at");
    let taskPriority = document.createElement("div");
    taskPriority.classList.add("todo-priority");
    taskObj.inputVal = input.value;
    taskText.textContent = ' ' + input.value;
    taskObj.taskDate = clearDate (new Date());
    taskDate.textContent = ' ' + clearDate (new Date());
    taskObj.taskPriority = document.getElementById("priority-selector").selectedOptions[0].value;
    taskPriority.textContent = ' ' + document.getElementById("priority-selector").selectedOptions[0].value;
    container.append(taskPriority);
    container.append(taskDate);
    container.append(taskText);
    taskArr.push(taskObj);
    viewSection.append(container);
    input.value = '';
    count ++;
    storageCounter = count;
    counter.textContent = "Number Of Task's: " + count;
    stringifiedTaskArr = JSON.stringify(taskArr);
    localStorage.setItem("omer", stringifiedTaskArr);
    localStorage.setItem("counter", storageCounter)
}
function doSort(){
    let viewSection = document.querySelector(".viewSection"); 
    const taskDiv = document.querySelectorAll(".todo-container")
    while (viewSection.hasChildNodes()) {  
        viewSection.removeChild(viewSection.firstChild);
        }
    let newArr = [];
    let prio = 1;
    for(let task of taskArr){
            newArr.push([task.taskPriority,task]);
    }
    newArr.sort(function(x, y) { return y[0] - x[0] ; });
    for (let i=0; i<newArr.length; i++) {
        let container = document.createElement("div");
        container.classList.add("todo-container");
        let taskText = document.createElement("div");
        taskText.classList.add("todo-text");
        let taskDate = document.createElement("div");
        taskDate.classList.add("todo-created-at");
        let taskPriority = document.createElement("div");
        taskPriority.classList.add("todo-priority");
        taskPriority.textContent = newArr[i][1].taskPriority;
        taskDate.textContent = ' ' + newArr[i][1].taskDate;
        taskText.textContent = ' ' + newArr[i][1].inputVal;
        container.append(taskPriority);
        container.append(taskDate);
        container.append(taskText);
        viewSection.appendChild(container);
    }
}
// giving a nice and clear time and day
function clearDate(date){
    if(date.getHours() <10 && date.getMinutes() <10)
    return  `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()} 0${date.getHours()}:0${date.getMinutes()}`;
    if(date.getHours()<10)
    return  `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()} 0${date.getHours()}:${date.getMinutes()}`;
    if(date.getMinutes() < 10)
    return  `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:0${date.getMinutes()}`;
    return `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
//adding item by using enter key
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("add-button").click();
    }
});
//printing the tasks from the local storage
function printLocal(arr){
    if(arr === null) return;
    if(arrLocal.length !==0 );
    for(let i=0; i<arr.length; i++){
    let taskObj = {inputVal:'' ,taskDate:'' ,taskPriority:'' ,};
    let container = document.createElement("div");
    container.classList.add("todo-container");
    let taskText = document.createElement("div");
    taskText.classList.add("todo-text");
    let taskDate = document.createElement("div");
    taskDate.classList.add("todo-created-at");
    let taskPriority = document.createElement("div");
    taskPriority.classList.add("todo-priority");
    taskObj.inputVal = arr[i].inputVal;
    taskText.textContent = ' ' + arr[i].inputVal;
    taskObj.taskDate = arr[i].taskDate;
    taskDate.textContent = ' ' + arr[i].taskDate;
    taskObj.taskPriority = arr[i].taskPriority;
    taskPriority.textContent = ' ' + arr[i].taskPriority;
    container.append(taskPriority);
    container.append(taskDate);
    container.append(taskText);
    taskArr.push(taskObj);
    counter.textContent = "Number Of Task's: " + localStorage.getItem("counter");
    viewSection.append(container);
    }
}
