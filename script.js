// Basic arithmetic helper functions used by the calculator.
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
    // Prevent division by zero and return a simple text result.
    if(b == 0){
        return "Undefined";
    }
    else{
        return a/b;
    }
}

// Determine which arithmetic function to call based on the selected operator symbol.
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

// Format values with commas in the integer portion for a cleaner display.
function formatDisplay(value) {
  const [intPart, decPart] = String(value).split(".");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
}

// Current calculator state stored as strings for easy input assembly.
let firstNumber = "";
let operator = "";
let secondNumber = "";
let resultDisplay = false;

const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display-box");

// Attach a click listener to every calculator button.
buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        const buttonValue = button.textContent;

        // Operator buttons set the current operation and may compute a running result.
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
                // If both operands are present, evaluate the previous expression first.
                const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));

                firstNumber = String(result);
                secondNumber = "";
                operator = buttonValue;
                display.textContent = formatDisplay(result);
            }
        }

        // Backspace removes the last digit from the active operand.
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

        // Numeric input is appended to the current operand string.
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

        // Equals button triggers evaluation when both operands are available.
        if(buttonValue === "="){
            if (firstNumber && operator && secondNumber){
                let result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber))
                display.textContent = formatDisplay(result);
            }
        }

        // Clear everything and reset the calculator state.
        if(buttonValue === "CE"){
            firstNumber = "";
            operator = "";
            secondNumber = "";
            display.textContent = "0"; 
        }
    }); 
});


