const number = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");


const checkInput = () => {
  output.textContent = "";

  if(!number.value || isNaN(number.value)){
    output.textContent = "Please enter a valid number";
    return;
  } else if(number.value <= 0){
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  } else if(number.value >= 4000){
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  }
  output.textContent = arabicToRoman(number.value);
  number.value = "";
};

let iter = 0;

const arabicToRoman = (num, str = "") => {
const romanNums = [
  ["M" , 1000],
  ["CM", 900],
  ["D" , 500],
  ["CD", 400],
  ["C" , 100],
  ["XC", 90],
  ["L" , 50],
  ["XL", 40],
  ["X" , 10],
  ["IX", 9],
  ["V" , 5],
  ["IV", 4],
  ["I" , 1]
];
  

  if(num === 0){
    iter = 0; // reset iter on finish
    return str;
  } else{
    if(num >= romanNums[iter][1]){
      return arabicToRoman(num - romanNums[iter][1], str + romanNums[iter][0]);
    } else{
      iter++;
      return arabicToRoman(num, str);
    }
  }
};


convertBtn.addEventListener("click", checkInput);

number.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    checkInput();
  }
});