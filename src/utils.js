const API_KEY = '6018414a5415b40ac220e3df'; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";

function updateBin(arr){
    showSpinner();
    fetch(`https://api.jsonbin.io/v3/b/${API_KEY}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "X-Bin-Versioning": true, 
            "X-Master-Key": "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK" 
        },
        body: JSON.stringify({"my-todo": arr}),
    }).then((res) => {
        if(!res.ok){
          alert("there was an error, the task have not saved")
          throw new Error("the error is: ", res);
        }
        showSpinner();})
        .catch((error) =>{
        console.log("there was an error ", error);
    });
}
//printing on load 
function printLoad(){
    showSpinner();
    localStorage.setItem("binID" , `${API_KEY}`);
    fetch( `https://api.jsonbin.io/v3/b/${API_KEY}/latest` ,{
      method: 'GET',
      headers: {
        "Content-Type": "application/json" 
      },  
    } ).then((res) => { res.json().then((json) => {
        printArr(json.record["my-todo"]);
        showSpinner();
    } ) } ).catch((error) =>{
        alert ("there was an error, the task have not saved");
        console.log("the error is: ", error);
    });;
}

function showSpinner() {
  if(loader.style.visibility === "visible"){
    loader.style.visibility =  "hidden";
  }else  loader.style.visibility = "visible"; 
}
