const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("results-div")

const telephoneCheck = (str) => {
  const regex = /^1{0,1}[- ]*\d{3}[- ]*\d{3}[- ]*\d{4}$/;
  const regex2 = /^1{0,1}[- ]*\(\d{3}\)[- ]*\d{3}[- ]*\d{4}$/;

  if(str.match(regex) || str.match(regex2)){
    return true;
  }
  return false;
};

const checkInput = () => {
  console.log(userInput.value);
  if(!userInput.value){
    alert("Please provide a phone number");
    return;
  };
  results.textContent = telephoneCheck(userInput.value)?
   "Valid US number: " + userInput.value:
   "Invalid US number: " + userInput.value;
};


checkBtn.addEventListener("click", checkInput);


clearBtn.addEventListener("click", () => {
  results.textContent = "";
});