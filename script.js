function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b == 0){
        return "Undefined";
    }
    else{
        return a/b;
    }
}

function operate(operator, firstNum, secondNum){
    if (operator === "+"){
        return add(firstNum, secondNum);
    }

    else if (operator === "-"){
        return subtract(firstNum, secondNum);
    }

    else if (operator === "x"){
        return multiply(firstNum, secondNum);
    }

    else if (operator === "÷"){
        return divide(firstNum, secondNum);
    }
}

function formatDisplay(value) {
  const [intPart, decPart] = String(value).split(".");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
}

let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultDisplay = false;

const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display-box");

buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        const buttonValue = button.textContent;

        if((buttonValue === "+" || buttonValue === "-" || buttonValue === "x" || buttonValue === "÷") ){
            operator = buttonValue;
            display.textContent = operator

            if(firstNumber === ""){
                return;
            }
            
            if (secondNumber === ""){
                operator = buttonValue;
            }
            else{
                const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));

                firstNumber = String(result);
                secondNumber = "";
                operator = buttonValue;
                display.textContent = formatDisplay(result);
            }
        }

        if(buttonValue === "⌫"){
            if(secondNumber !== ""){
                secondNumber = secondNumber.slice(0, -1);
                display.textContent = secondNumber || "0";
            }
            else if(operator === ""){
                firstNumber = firstNumber.slice(0, -1);
                display.textContent = firstNumber || "0";
            }

            return;
        }

        if(!isNaN(buttonValue)){
            if(operator === ""){
                firstNumber += buttonValue;
                display.textContent = formatDisplay(firstNumber);
            }

            else{
                secondNumber += buttonValue;
                display.textContent = formatDisplay(secondNumber);
            }
        }

        console.log("First: "+firstNumber);
        console.log("Operator: "+operator);
        console.log("Second: " + secondNumber);

        if(buttonValue === "="){
            if (firstNumber && operator && secondNumber){
                let result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber))
                display.textContent = formatDisplay(result);
            }
        }

        if(buttonValue === "CE"){
            firstNumber = "";
            operator = "";
            secondNumber = "";
            display.textContent = "0"; 
        }
    }); 
});


