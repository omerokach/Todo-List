  
// when refresh it take the info from the local storage
window.addEventListener("DOMContentLoaded", async (e) =>{
    showSpinner();
    await printLoad();
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
const reset = document.getElementById("reset-button");
const spinner = document.getElementById("loader");
const undoButton = document.getElementById("undo-button");
let taskArr = [];
let storageCounter;
count = localStorage.getItem("counter");
// adding the add events to the buttons
add.addEventListener("click", doAdd);
sort.addEventListener("click", doSort);
reset.addEventListener("click", doReset);
undoButton.addEventListener("click", undo);
///================functions=================
// the add event function ,add and updating the local storage the counter and tasks 
async function doAdd(){
    let taskObj = {text:'' ,date:'' ,priority:'' ,};
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.addEventListener("click", doRemove);
    remove.textContent = "remove";
    const check = document.createElement("input");
    check.setAttribute("type","checkbox");
    check.classList.add("checkbox");
    let container = document.createElement("div");
    container.classList.add("todo-container");
    let taskText = document.createElement("div");
    taskText.classList.add("todo-text");
    let taskDate = document.createElement("div");
    taskDate.classList.add("todo-created-at");
    let taskPriority = document.createElement("div");
    taskPriority.classList.add("todo-priority");
    taskObj.text = input.value;
    taskText.textContent = input.value;
    input.value = '';
    taskObj.date = clearDate (new Date());
    taskDate.textContent = clearDate (new Date());
    taskObj.priority = document.getElementById("priority-selector").selectedOptions[0].value;
    taskPriority.textContent = document.getElementById("priority-selector").selectedOptions[0].value;
    container.append(check);
    container.append(taskPriority);
    container.append(taskDate);
    container.append(taskText);
    container.append(remove);
    taskArr.push(taskObj);
    viewSection.append(container);
    storageCounter = localStorage.getItem("counter");
    storageCounter++;
    counter.textContent =  storageCounter;
    stringifiedTaskArr = JSON.stringify(taskArr);
    localStorage.setItem("omer", stringifiedTaskArr);
    localStorage.setItem("counter", storageCounter);
    updateBin(taskArr);
}
//adding enter key
input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("add-button").click();
        }
    });
//the sort function
function doSort(){
    let viewSection = document.querySelector(".viewSection"); 
    const taskDiv = document.querySelectorAll(".todo-container")
    while (viewSection.hasChildNodes()) {  
        viewSection.removeChild(viewSection.firstChild);
        }
        let newArr = [];
        for(let task of taskArr){
            newArr.push([task.priority,task]);
    }
    newArr.sort(function(x, y) { return y[0] - x[0] ; });
    for (let i=0; i<newArr.length; i++) {
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.addEventListener("click", doRemove);
        remove.textContent = "remove";
        let check = document.createElement("input");
        check.setAttribute("type","checkbox");
        check.classList.add("checkbox");
        let container = document.createElement("div");
        container.classList.add("todo-container");
        let taskText = document.createElement("div");
        taskText.classList.add("todo-text");
        let taskDate = document.createElement("div");
        taskDate.classList.add("todo-created-at");
        let taskPriority = document.createElement("div");
        taskPriority.classList.add("todo-priority");
        taskPriority.textContent = newArr[i][1].priority;
        taskDate.textContent = newArr[i][1].date;
        taskText.textContent = newArr[i][1].text;
        container.append(check);
        container.append(taskPriority);
        container.append(taskDate);
        container.append(taskText);
        container.append(remove);
        viewSection.appendChild(container);
        counter.textContent = localStorage.getItem("counter");
    }   
}
// the reset function
async function doReset(){
    let answer = confirm("are you sure you want to reset all?");
    if(answer){
    let todoList =  [];
    count = 0;
    let viewSection = document.querySelector(".viewSection"); 
    while (viewSection.firstChild) {
        viewSection.removeChild(viewSection.lastChild);
      }
    updateBin(todoList);
    taskArr = [];
    counter.textContent = taskArr.length;
    localStorage.setItem("omer", []);
    localStorage.setItem("counter", count);
    }
}
// giving a nice and clear time and day
function clearDate(date){
    let newDate = (date.toISOString()).split(".")[0];
    return newDate.split("T")[0] + " " + newDate.split("T")[1]; 
}
//printing the tasks from the local storage/json BIN
function printArr(arr){
    for(let i=0; i<arr.length; i++){
        let check = document.createElement("input");
        const remove = document.createElement("button");
        remove.classList.add("remove");
        remove.addEventListener("click", doRemove);
        remove.textContent = "remove";
        check.setAttribute("type","checkbox");
        check.classList.add("checkbox");
        let taskObj = {text:'' ,date:'' ,priority:'' ,};   
        let container = document.createElement("div");
        container.classList.add("todo-container");
        let taskText = document.createElement("div");
        taskText.classList.add("todo-text");
        let taskDate = document.createElement("div");
        taskDate.classList.add("todo-created-at");
        let taskPriority = document.createElement("div");
        taskPriority.classList.add("todo-priority");
        taskObj.text = arr[i].text;
        taskText.textContent = arr[i].text;
        taskObj.date = arr[i].date;
        taskDate.textContent = arr[i].date;
        taskObj.priority = arr[i].priority;
        taskPriority.textContent = arr[i].priority;
        container.append(check);
        container.append(taskPriority);
        container.append(taskDate);
        container.append(taskText);
        container.append(remove);
        taskArr.push(taskObj);
        localStorage.setItem("counter", taskArr.length);
        counter.textContent = taskArr.length;
        viewSection.append(container);
    }
}
// PUT fetch to the bin with the latest info
async function updateBin(arr){
    const res = await fetch(`https://api.jsonbin.io/v3/b/601414a21de5467ca6bdd720`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "X-Bin-Versioning": true, 
            "X-Master-Key": "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK" 
        },
        body: JSON.stringify({"my-todo": arr}),
    })
    console.log("the put arr:", res);
}
//printing on load 
async function printLoad(){
    localStorage.setItem("binID" , '601414a21de5467ca6bdd720');
    const getRes = await fetch( `https://api.jsonbin.io/v3/b/601414a21de5467ca6bdd720/latest` ,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json" 
      },  
    } )
    binArr = await getRes.json();
    console.log("binArr: ", binArr.record["my-todo"]);
    printArr(binArr.record["my-todo"]);
}
//the spinner load func
function showSpinner() {
  loader.style.visibility = "visible";
  setTimeout(() => {
    loader.style.visibility = loader.style.visibility.replace("visible", "hidden");
  }, 1500);
}
//remove function
function doRemove(e) {
  let answer = confirm("Are you sure you want to remove this task?");
  if (answer === true) {
    e.target.parentElement.remove();
    let count = localStorage.getItem("counter");
    count--;
    localStorage.setItem ("counter", count);
    counter.textContent =  localStorage.getItem("counter");
    let textOfRemoveTask = e.target.parentElement.querySelector(".todo-text").textContent;
    removeThisTask(textOfRemoveTask);
  }
  return;
};
//remove the specific task by her text 
function removeThisTask(text){
    let lastRemove;
    for(let i=0; i<taskArr.length; i++){
        if(taskArr[i].text === text){
            lastRemove = taskArr.splice(i, 1);
            console.log("newArr:", taskArr);
        }
    }
    localStorage.setItem("lastRemove", JSON.stringify(lastRemove));
    updateBin(taskArr);
}
//undo function - takes the last item removed from the local storage
function undo(){
    let lastRemove = JSON.parse(localStorage.getItem("lastRemove"));
    lastRemove = lastRemove[0];
    taskArr.push(lastRemove);
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.addEventListener("click", doRemove);
    remove.textContent = "remove";
    const check = document.createElement("input");
    check.setAttribute("type","checkbox");
    check.classList.add("checkbox");
    let container = document.createElement("div");
    container.classList.add("todo-container");
    let taskText = document.createElement("div");
    taskText.classList.add("todo-text");
    let taskDate = document.createElement("div");
    taskDate.classList.add("todo-created-at");
    let taskPriority = document.createElement("div");
    taskPriority.classList.add("todo-priority");
    taskText.textContent = lastRemove.text;
    taskDate.textContent = lastRemove.date;
    taskPriority.textContent = lastRemove.priority;
    container.append(check);
    container.append(taskPriority);
    container.append(taskDate);
    container.append(taskText);
    container.append(remove);
    viewSection.append(container);
    storageCounter = localStorage.getItem("counter");
    storageCounter++;
    counter.textContent =  storageCounter;
    stringifiedTaskArr = JSON.stringify(taskArr);
    localStorage.setItem("omer", stringifiedTaskArr);
    localStorage.setItem("counter", storageCounter);
    console.log("that stringified :" + stringifiedTaskArr);
    updateBin(taskArr);
    localStorage.setItem("lastRemove" , "");
}