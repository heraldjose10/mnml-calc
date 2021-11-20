function showResult() {

    ansToDisplay = firstNumber + operand + secondNumber;
    calculatorDisplay.innerText = (ansToDisplay);
}


function roundNumber(numberToRound, decimalsRequired) {
    Math.round(numberToRound * (10 ** decimalsRequired)) / 10 ** decimalsRequired;
}


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
    showResult();
}


function handleOperandPress(e) {
    if (firstNumber) {
        if (secondNumber) {
            calculateExpression();
            operand = this.textContent;
            showResult();
        }
        else {
            operand = this.textContent;
            showResult();
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
        showResult();
    }
    else if (operand == '*') {
        firstNumber *= secondNumber;
        secondNumber = '';
        operand = '';
        showResult();
    }
    else if (operand == '-') {
        firstNumber -= secondNumber;
        secondNumber = '';
        operand = '';
        showResult();
    }
    else if (operand == '/') {
        firstNumber /= secondNumber;
        secondNumber = '';
        operand = '';
        showResult();
    }
}


function clearAll() {
    firstNumber = '';
    secondNumber = '';
    operand = '';
    appendToFirstNumber = true;
}


function handleAllClear() {
    clearAll();
    showResult();
}


function deleteNumber() {
    if (firstNumber && secondNumber && operand) {
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);

    }
    else if (!secondNumber && operand) {
        operand = '';
    }
    else if (!operand) {
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
    }
    showResult();
}


clearAll();

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

const allClearButton = document.querySelector('.all-selector');
allClearButton.addEventListener('click', handleAllClear);

const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', deleteNumber);