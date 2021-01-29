// when refresh it take the info from the local storage
window.addEventListener("DOMContentLoaded", async (e) =>{
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
let taskArr = [];
let storageCounter;
count = localStorage.getItem("counter");
// adding the add event to add and sort button
add.addEventListener("click", doAdd);
sort.addEventListener("click", doSort);
reset.addEventListener("click", doReset);
///================functions=================
// the add event function ,add and updating the local storage the counter and tasks 
async function doAdd(){
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
    input.value = '';
    // let removeButton = document.createElement("button");
    // removeButton.classList.add("remove");
    // removeButton.textContent = "remove task";
    taskObj.taskDate = clearDate (new Date());
    taskDate.textContent = ' ' + clearDate (new Date());
    taskObj.taskPriority = document.getElementById("priority-selector").selectedOptions[0].value;
    taskPriority.textContent = ' ' + document.getElementById("priority-selector").selectedOptions[0].value;
    container.append(taskPriority);
    container.append(taskDate);
    container.append(taskText);
    taskArr.push(taskObj);
    viewSection.append(container);
    // container.append(removeButton);
    count ++;
    storageCounter = count;
    counter.textContent =  count;
    stringifiedTaskArr = JSON.stringify(taskArr);
    localStorage.setItem("omer", stringifiedTaskArr);
    localStorage.setItem("counter", storageCounter)
    console.log("that stringified :" + stringifiedTaskArr);
    updateBin(stringifiedTaskArr)
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
// the reset function
async function doReset(){
    let todoList = {"my-todo": [] };
    let stringifyTodo = JSON.stringify(todoList);
    count = 0;
    let viewSection = document.querySelector(".viewSection"); 
    while (viewSection.firstChild) {
        viewSection.removeChild(viewSection.lastChild);
      }
    updateBin(stringifyTodo);
    taskArr = [];
    counter.textContent = taskArr.length;
    localStorage.setItem("omer", []);
    localStorage.setItem("counter", count)
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
//printing the tasks from the local storage
function printArr(arr){
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
        counter.textContent = localStorage.getItem("counter");
        viewSection.append(container);
    }
}
// PUT fetch to the bin with the latest info
async function updateBin(arr){
    const res = await fetch(`https://api.jsonbin.io/b/601414a21de5467ca6bdd720` ,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "secret-key" : "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK"  
        },
        body: arr,
    })
}

async function printLoad(){
    localStorage.setItem("binID" , 'https://api.jsonbin.io/b/601414a21de5467ca6bdd720')
    const getRes = await fetch( `https://api.jsonbin.io/b/601414a21de5467ca6bdd720/latest` ,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json" ,
        "secret-key" : "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK"
      },  
    })
    binArr = await getRes.json();
    console.log("binArr: ", binArr);
    printArr(binArr);
}