const API_KEY = ''; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";


function printLoad(){
  showSpinner();
  localStorage.setItem("binID" , '601414a21de5467ca6bdd720');
  fetch( `https://api.jsonbin.io/v3/b/601414a21de5467ca6bdd720/latest` ,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json" 
    },  
  } ).then((res) => { res.json().then((json) => {
      printArr(json.record["my-todo"]);
      showSpinner();
  } ) } ).catch((error) =>{
      console.log("the error is: ", error);
  });;
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
function updateBin(arr){
  showSpinner();
  fetch(`https://api.jsonbin.io/v/b/601414a21de5467ca6bdd720`,{
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
          "X-Bin-Versioning": true, 
          "X-Master-Key": "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK" 
      },
      body: JSON.stringify({"my-todo": arr}),
  }).then((res) => {
      if(!res.ok){
      alert("there was a network error, info didn't saved")
      throw new Error("the error is: ", res);
      }
      showSpinner();})
      .catch((error) =>{
      console.log("there was an error ", error);
  });
}
function showSpinner() {
  if(loader.style.visibility === "visible"){
    loader.style.visibility.replace("visible", "hidden");
  }else loader.style.visibility.replace("hidden", "visible");
}
