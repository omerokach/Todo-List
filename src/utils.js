const API_KEY = '0ca801d3-cb6d-4850-800b-106644034807'; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";

function updateBin(arr){
  showSpinner();
  fetch(`http://localhost:3000/b/${API_KEY}`,{
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
          "X-Bin-Versioning": true, 
          "X-Master-Key": "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK" 
      },
      body: JSON.stringify({"my-todo": arr}),
  }).then((res) => {
      if(res.ok){
        return res.json();
      } else{
        alert("there was an error, the task have not saved")
        throw new Error("the error is: ", res.status);
        }
      }).then(() => {
        showSpinner();
      })
      .catch((error) =>{
      console.log("there was an error ", error);
      showSpinner();
  });
}
//printing on load 
function printLoad(){
  showSpinner();
  localStorage.setItem("binID" , `${API_KEY}`);
  fetch( `http://localhost:3000/b/${API_KEY}` ,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json" 
    },  
  } ).then((res) => { res.json().then((json) => {
      printArr(json.data["my-todo"]);
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
