function handleNumberPress(e) {
    if (appendToFirstNumber) {
        firstNumber += this.textContent
    }
    else {
        if (operand) {
            secondNumber += this.textContent;
        }
        else {
            firstNumber = this.textContent;
            appendToFirstNumber = true;
        }
    }
    calculatorDisplay.innerText = (firstNumber + operand + secondNumber);
}


function handleOperandPress(e) {
    if (firstNumber) {
        if (secondNumber) {
            calculateExpression();
            operand = this.textContent;
            calculatorDisplay.innerText = (firstNumber + operand + secondNumber);
        }
        else {
            operand = this.textContent;
            calculatorDisplay.innerText = (firstNumber + operand + secondNumber);
            appendToFirstNumber = false;
        }
    }
}


function calculateExpression() {
    if (!firstNumber || !secondNumber || !operand) {
        return;
    }
    if (operand == '+') {
        firstNumber = Number(firstNumber) + Number(secondNumber);
        secondNumber = '';
        operand = '';
        calculatorDisplay.innerText = (firstNumber + operand + secondNumber);
    }
    else if (operand == '*') {
        firstNumber *= secondNumber;
        secondNumber = '';
        operand = '';
        calculatorDisplay.innerText = (firstNumber + operand + secondNumber);
    }
    else if (operand == '-') {
        firstNumber -= secondNumber;
        secondNumber = '';
        operand = '';
        calculatorDisplay.innerText = (firstNumber + operand + secondNumber);
    }
    else if (operand == '/') {
        firstNumber /= secondNumber;
        secondNumber = '';
        operand = '';
        calculatorDisplay.innerText = (firstNumber + operand + secondNumber);
    }
}

let firstNumber = '';
let secondNumber = '';
let operand = '';
let appendToFirstNumber = true;

const calculatorDisplay = document.querySelector('.display');

const numberKeys = document.querySelectorAll('.number');
numberKeys.forEach(key => {
    key.addEventListener('click', handleNumberPress);
});

const operandKeys = document.querySelectorAll('.operand');
operandKeys.forEach(key => {
    key.addEventListener('click', handleOperandPress)
});

const equalsToButton = document.querySelector('.equalto');
equalsToButton.addEventListener('click', calculateExpression);