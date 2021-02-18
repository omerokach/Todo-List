const API_KEY = '0ca801d3-cb6d-4850-800b-106644034807'; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";


// PUT fetch to the bin with the latest info
async function updateBin(arr){
  showSpinner();
  try { const res = await fetch(`http://localhost:3000/b/${API_KEY}`,{
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
          "X-Bin-Versioning": true, 
          "X-Master-Key": "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK" 
      },
      body: JSON.stringify({"my-todo": arr}),
  })} catch(e){
    console.log(res)
    console.log(e);
    alert("there was an error, the task didn't saved")
    showSpinner();
  }
  showSpinner();
}
//printing on load 
async function printLoad(){
  showSpinner();
  localStorage.setItem("binID" , `${API_KEY}`);
  try { const getRes = await fetch( `http://localhost:3000/b/${API_KEY}` ,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json" 
    },  
  } )
  const binArr = await getRes.json();
  console.log(binArr.data);
  printArr(binArr.data["my-todo"]);
  showSpinner();
  } catch{
    alert("there was an error, the task didn't saved")
    showSpinner();
  }
}
//the spinner load func
function showSpinner() {
  if(loader.style.visibility === "visible"){
    loader.style.visibility = "hidden";
  }else loader.style.visibility = "visible";
}
