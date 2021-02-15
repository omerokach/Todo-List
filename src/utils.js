const API_KEY = '601840815415b40ac220e352'; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";


// PUT fetch to the bin with the latest info
async function updateBin(arr){
  showSpinner();
  try { const res = await fetch(`https://api.jsonbin.io/v3/b/${API_KEY}`,{
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
          "X-Bin-Versioning": true, 
          "X-Master-Key": "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK" 
      },
      body: JSON.stringify({"my-todo": arr}),
  })} catch{
    alert("there was an error, the task didn't saved")
    showSpinner();
  }
  showSpinner();
}
//printing on load 
async function printLoad(){
  showSpinner();
  localStorage.setItem("binID" , `${API_KEY}`);
  try { const getRes = await fetch( `https://api.jsonbin.io/v3/b/${API_KEY}/latest` ,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json" 
    },  
  } )
  binArr = await getRes.json();
  console.log("binArr: ", binArr.record["my-todo"]);
  printArr(binArr.record["my-todo"]);
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
