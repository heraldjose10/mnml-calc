function showResult() {

    firstNumber = String(firstNumber);
    let totalAllowedCharacters = 10;

    if (firstNumber.indexOf('.') >= 0 && firstNumber.indexOf('e') < 0) {
        let splitNumber = firstNumber.split('.');
        let decimalsRequired = totalAllowedCharacters - 1 - splitNumber[0].length;
        let roundedDecimal = roundNumber('.'.concat(splitNumber[1]), decimalsRequired);
        firstNumber = splitNumber[0] + '.' + roundedDecimal;
    }

    if (firstNumber.length > 10) {

        //if number is a negetive number
        if (firstNumber[0] == '-') {
            let spaceForWholeNumber = totalAllowedCharacters - 3;
            let wholeNumberToRound = firstNumber.slice(1, 8);
            let wholeNumber = roundNumber('.'.concat(wholeNumberToRound), spaceForWholeNumber);
            let numberAfterE = firstNumber.length - wholeNumber.length - 1;
            firstNumber = '-' + wholeNumber + 'E' + String(numberAfterE);
        }

        else {
            let spaceForWholeNumber = totalAllowedCharacters - 2;
            let wholeNumberToRound = firstNumber.slice(0, 8);
            let wholeNumber = roundNumber('.'.concat(wholeNumberToRound), spaceForWholeNumber);
            let numberAfterE = firstNumber.length - wholeNumber.length;
            firstNumber = wholeNumber + 'E' + String(numberAfterE);
        }
    }

    displayOnMainDisplay = firstNumber + operand + secondNumber;
    calculatorSecondDisplay.innerText = '';
    calculatorMainDisplay.innerText = (displayOnMainDisplay);
}


function showOnMainDisplay() {
    calculatorMainDisplay.innerText = firstNumber;
}

function showResultOnSecondary() {
    calculatorSecondDisplay.innerText = firstNumber;
    calculatorMainDisplay.innerText = operand + secondNumber;
}


function roundNumber(numberToRound, decimalsRequired) {
    let roundedNumber = Math.round(numberToRound * (10 ** decimalsRequired)) / 10 ** decimalsRequired;
    return String(roundedNumber).split('.')[1]

}


function handleNumberPress(numberPressed) {
    if (appendToFirstNumber) {
        firstNumber += numberPressed;
        showOnMainDisplay();
    }
    else {
        if (operand) {
            secondNumber += numberPressed
            showResultOnSecondary();
        }
        else {
            firstNumber = numberPressed;
            appendToFirstNumber = true;
            showResult()
        }
    }

}


function handleOperandPress(operandPressed) {
    if (firstNumber) {
        if (secondNumber) {
            calculateExpression();
            operand = operandPressed;
            showResultOnSecondary();
        }
        else {
            operand = operandPressed;
            showResultOnSecondary();
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
        showResultOnSecondary();
    }
    else if (!secondNumber && operand) {
        operand = '';
        appendToFirstNumber = true
        showResult();
    }
    else if (!operand) {
        firstNumber = String(firstNumber).slice(0, String(firstNumber).length - 1);
        showOnMainDisplay();
    }

}


function handleDecimalPress() {
    if (appendToFirstNumber) {
        let firstNumberSplit = firstNumber.split('.');
        if (firstNumberSplit.length >= 2) {
            return;
        }
        else {
            firstNumber += '.';
            showOnMainDisplay();
        }
    }
    else {
        if (operand) {
            let secondNumberSplit = secondNumber.split('.');
            if (secondNumberSplit.length >= 2) {
                return;
            }
            else {
                secondNumber += '.';
                showResultOnSecondary();
            }
        }
    }
}


function handleKeyPress(e) {

    if (e.key <= 9 && e.key >= 0 && e.key != ' ') {
        handleNumberPress(e.key)
    }

    else if (e.key == 'Backspace' || e.key == 'Delete') {
        deleteNumber();
    }

    else if (e.key == '.') {
        handleDecimalPress();
    }

    else if (e.key == 'Enter' || e.key == '=') {
        calculateExpression();
    }

    else {
        let operands = ['/', '*', '-', '+']
        if (operands.indexOf(e.key) >= 0) {
            handleOperandPress(e.key);
        }
    }
}


let firstNumber = '';
let secondNumber = '';
let operand = '';
let appendToFirstNumber = true;


const calculatorMainDisplay = document.querySelector('.display').querySelector('.main');
const calculatorSecondDisplay = document.querySelector('.display').querySelector('.second');

const numberKeys = document.querySelectorAll('.number');
numberKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        handleNumberPress(e.target.textContent);
    });
});

const operandKeys = document.querySelectorAll('.operand');
operandKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        handleOperandPress(e.target.textContent);
    });
});

const equalsToButton = document.querySelector('.equalto');
equalsToButton.addEventListener('click', calculateExpression);

const allClearButton = document.querySelector('.all-selector');
allClearButton.addEventListener('click', handleAllClear);

const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', deleteNumber);

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', handleDecimalPress);

// add keyboard events
window.addEventListener('keyup', handleKeyPress);