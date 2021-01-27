window.addEventListener("DOMContentLoaded", run)
function run(){
    let counter = 0;
    let viewSection = document.querySelector(".viewSection");
    const select = document.getElementById("prioritySelector");
    const input = document.getElementById("text-input");
    const add = document.getElementById("add-button")
    const taskArr = [];
    add.addEventListener("click", e =>{
        let inputVal = input.value;
        let taskDate = new date();
        // need 
        taskArr.push(item);
        input.value = '';
        let task = document.createElement("div");
        task.textContent = item;
        viewSection.appendChild(task);
    })

}