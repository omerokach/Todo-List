window.addEventListener("DOMContentLoaded", run)
function run(){
    let count = 0;
    let viewSection = document.querySelector(".viewSection");
    const prioritySelector = document.getElementById("priority-selector");
    const counter = document.getElementById("counter");
    const input = document.getElementById("text-input");
    const add = document.getElementById("add-button");
    const sort = document.getElementById("sort-button");
    const taskArr = [];
    const priorityArr = []
    add.addEventListener("click", e =>{
        let taskObj = {inputVal:'' ,taskDate:'' ,taskPriority:'' ,};
        let task = document.createElement("div");
        task.classList.add("todo-container");
        let taskText = document.createElement("span");
        taskText.classList.add("todo-text");
        let taskDate = document.createElement("span");
        taskDate.classList.add("todo-created-at");
        let taskPriority = document.createElement("span");
        taskPriority.classList.add("todo-priority");
        taskObj.inputVal = input.value;
        taskText.textContent = ' ' + input.value;
        taskObj.taskDate = clearDate (new Date());
        taskDate.textContent = ' ' + clearDate (new Date());
        taskObj.taskPriority = document.getElementById("priority-selector").selectedOptions[0].value;
        taskPriority.textContent = ' ' + document.getElementById("priority-selector").selectedOptions[0].value;
        task.append(taskPriority);
        task.append(taskDate);
        task.append(taskText);
        taskArr.push(taskObj);
        priorityArr.push(Number(taskObj.taskPriority));
        viewSection.append(task);
        input.value = '';
        count ++;
        counter.textContent = "The Number of Task's are "+ count;
    })
    sort.addEventListener("click", doSort)


    function doSort(){
        let viewSection = document.querySelector(".viewSection"); 
        const taskDiv = document.querySelectorAll(".todo-container")
        while (viewSection.hasChildNodes()) {  
            viewSection.removeChild(viewSection.firstChild);
          }
        let newArr = [];
        let prio = 1;
        for(let task of taskArr){
                newArr.push([task.taskPriority,task])
        }
        newArr.sort(function(x, y) {
            return x[0] - y[0];
        });
        for (let i=0; i<newArr.length; i++) {
            let task = document.createElement("div");
            task.classList.add("todo-container");
            let taskText = document.createElement("span");
            taskText.classList.add("todo-text");
            let taskDate = document.createElement("span");
            taskDate.classList.add("todo-created-at");
            let taskPriority = document.createElement("span");
            taskPriority.classList.add("todo-priority");
            taskPriority.textContent = newArr[i][1].taskPriority;
            taskDate.textContent = ' ' + newArr[i][1].taskDate;
            taskText.textContent = ' ' + newArr[i][1].inputVal;
            task.append(taskPriority);
            task.append(taskDate);
            task.append(taskText);
            viewSection.appendChild(task);
        }
    }
    function clearDate(date){
        return `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }
}