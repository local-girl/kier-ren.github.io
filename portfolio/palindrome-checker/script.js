const checkButton = document.getElementById("check-btn");

function checkPalindrome(event){
    event.preventDefault();
    const input = document.getElementById("text-input").value;
    const result = document.getElementById("result");

    console.log(`input is ${input}`)

    if(input == ""){
        alert("Please input a value");
        return;
    }

    const lowerCase = input.toLowerCase();
    // ignore non-alphanumerical chars
    const regex = /[a-zA-Z0-9]/g;
    const match = lowerCase.match(regex);
    for(let i = 0; i < match.length; i++){
        if(match[i] !== match[match.length - 1 - i]){
            result.innerHTML = (`${input} is not a palindrome.`);
            result.removeAttribute("hidden");
            return;
        }
    }
    result.innerHTML = (`${input} is a palindrome.`);
    result.removeAttribute("hidden");
}

checkButton.addEventListener("click", checkPalindrome);