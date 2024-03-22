const purchaseBtn = document.getElementById("purchase-btn");
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const priceContainer = document.getElementById("price");
const cidContainer = document.getElementById("cid");
const register = document.getElementById("register");
const showHideRegister = document.getElementById("show-hide-register");
const registerBtn = document.getElementById("register-btn");

let isRegisterShowing = false;

let price = 1.87;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currency = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

const changeEmpty = [
  ["PENNY", 0],
  ["NICKLE", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE",  0],
  ["TEN",  0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

let change;

let remainingCid = cid;

const convertToCents = (arr) => arr.map(val => [val[0], val[1] * 100]);

let cidCents;
const currencyCents = convertToCents(currency);

const displayRegister = (arr = remainingCid) => {
  priceContainer.textContent = `Price: $${price}`;
  cidContainer.textContent = "Cash in drawer: ";

  for(const coin in cid){
    cidContainer.innerHTML += `<p>${String(arr[coin][0]).charAt(0).toUpperCase()}${String(arr[coin][0]).substr(1).toLowerCase()}: $${parseFloat(arr[coin][1]).toFixed(2)}</p>`;
  }
};

const checkInput = () => {
  changeDue.textContent = "";

  if(!cash.value || isNaN(cash.value)){
    changeDue.textContent = "Please enter a valid number";
    return;
  } else if(cash.value < price){
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if(cash.value == price){
    changeDue.textContent = "No change due - customer paid with exact cash";
    return;
  }
  cidCents = convertToCents(cid);
  change = JSON.parse(JSON.stringify(changeEmpty));
  
  changeDue.textContent = determineChange(cash.value * 100 - price * 100);

  cash.value = "";
  remainingCid = cid.map((el, index) => [el[0], el[1] - change[index][1] / 100]);
  displayRegister(remainingCid);
  change = JSON.parse(JSON.stringify(changeEmpty));
};

const compareArrays = (a, b) => a.length === b.length && a.every((element, index) => element[1] === b[index][1]);


const determineChange = (changeOwed, iter = 1) => {
  if(iter > 9 && changeOwed !== 0){
    iter = 1;
    return "Status: INSUFFICIENT_FUNDS";
  }

  let currValue = cidCents[cid.length - iter][1];
  let currCoinValue = currencyCents[cid.length - iter][1];

  if(changeOwed === 0){
    const filteredChange = change.filter(val => val[1] !== 0)
    .reverse()
    .map(val => [val[0], val[1] / 100]);

    const filteredCid = cidCents.filter(val => val[1] !== 0)
    .reverse()
    .map(val => [val[0], val[1] / 100]);

    let str = "";
    for(let i = 0; i < filteredChange.length; i++){
      str += " " + filteredChange[i][0] + ": $" + filteredChange[i][1];
    }
    if(compareArrays(change, convertToCents(cid))){
      iter = 1;
      return "Status: CLOSED" + str;
    } else if(changeOwed === 0 && filteredCid){
      iter = 1;
      return "Status: OPEN" + str;
    }
  } else if(changeOwed >= currCoinValue && currValue >= currCoinValue){
    cidCents[cid.length - iter][1] -= currCoinValue;
    change[change.length - iter][1] += currCoinValue;
    changeOwed -= currCoinValue;
    return determineChange(changeOwed, iter);
  } else{
      iter++;
      return determineChange(changeOwed, iter);
    }
};

purchaseBtn.addEventListener("click", checkInput);

cash.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    checkInput();
  } else{
    displayRegister(cid);
  }
});


registerBtn.addEventListener("click", () => {
  isRegisterShowing = !isRegisterShowing;
  showHideRegister.textContent = isRegisterShowing ? "Hide Register" : "Show Register";
  register.style.display = isRegisterShowing ? "flex" : "none";
  displayRegister();
});