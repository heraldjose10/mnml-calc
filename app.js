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
        let spaceForWholeNumber = totalAllowedCharacters - 2;
        let numberAfterE = firstNumber.length - 8;
        let wholeNumberToRound = firstNumber.slice(0, 8);
        let wholeNumber = roundNumber('.'.concat(wholeNumberToRound), spaceForWholeNumber);
        firstNumber = wholeNumber + 'E' + String(numberAfterE);
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


function handleNumberPress(e) {
    if (appendToFirstNumber) {
        firstNumber += this.textContent
        showOnMainDisplay();
    }
    else {
        if (operand) {
            secondNumber += this.textContent;
            showResultOnSecondary(); //change
        }
        else {
            firstNumber = this.textContent;
            appendToFirstNumber = true;
            showResult()
        }
    }

}


function handleOperandPress(e) {
    if (firstNumber) {
        if (secondNumber) {
            calculateExpression();
            operand = this.textContent;
            showResultOnSecondary();//change to new fun
        }
        else {
            operand = this.textContent;
            showResultOnSecondary();//change
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
            let secondNumberSplit = secondNumber.split(',');
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


let firstNumber = '';
let secondNumber = '';
let operand = '';
let appendToFirstNumber = true;


const calculatorMainDisplay = document.querySelector('.display').querySelector('.main');
const calculatorSecondDisplay = document.querySelector('.display').querySelector('.second');

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

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', handleDecimalPress);