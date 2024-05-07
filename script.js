const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
let currentValue = "0";
let expression = "";
let resetDisplay = false;
const maxDisplayLength = 23;
var overflow=false;

function evaluateExpression(expr) {
    try {
        return new Function('return ' + expr)();
    } catch (error) {
        return "Error";
    }
}



buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.value;

        if (display.textContent.length >= maxDisplayLength && value !== "ac" && value !== "=") {
          alert("Maximum input length reached."); // Notify user
          overflow=true;
          return; // Prevent further input
      }else{
        overflow=false;
      }

        if (!isNaN(value) || value === ".") { // Number or decimal
            if (resetDisplay || currentValue === "0") {
                currentValue = value;
                resetDisplay = false;
            } else {
                currentValue += value;
            }
            expression += value;
        } else if (value === "ac") { // Reset everything
            currentValue = "0";
            expression = "";
            resetDisplay = false;
            display.textContent="0";
            return;
        } else if (value === "+/-") { // Toggle sign
            if (currentValue.includes("-")) {
                currentValue = currentValue.substring(1);
            } else {
                currentValue = "-" + currentValue;
            }
            expression = expression.slice(0, -currentValue.length) + currentValue;
        } else if (value === "=") { // Calculate result
            let result = evaluateExpression(expression);
            expression = result.toString();
            currentValue = expression;
            resetDisplay = true;
        } else { // Operators and percent
            if (resetDisplay) {
                expression = currentValue;
                resetDisplay = false;
            }
            currentValue = "";
            expression += value;
        }

        display.textContent = value === "=" ? currentValue : expression;
    });
});
