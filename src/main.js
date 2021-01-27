window.addEventListener("DOMContentLoaded", run)
function run(){
    let counter = 0;
    let viewSection = document.querySelector(".viewSection");
    const priority = document.getElementById("priority-selector");
    const input = document.getElementById("text-input");
    const add = document.getElementById("add-button")
    const taskArr = [];
    add.addEventListener("click", e =>{
        let inputVal = input.value;
        let taskDate = clearDate (new Date());
        let taskPriority = document.getElementById("priority-selector").selectedOptions[0].value;
        let taskText = `${taskPriority} ${taskDate} ${inputVal}`;
        console.log(taskText)
        taskArr.push(item);
        input.value = '';
        let task = document.createElement("div");
        task.textContent = item;
        viewSection.appendChild(task);
    })
    function clearDate(date){
        return `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }
}