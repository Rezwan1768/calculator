"use strict"

// Fuctions used for calculation
function add(a, b) {
  return round(a + b);

}

function subtract(a, b) {
  return round(a - b);
}

function multiply(a, b) {
  return round(a * b);
}

function divide(a, b) {
  return round(a / b);
}

// Round foating point numbers
function round(result) {
  if (!Number.isInteger(result)) {
    return +result.toFixed(2)
  }
  return result;
}

function operate(x, op, y) {
  switch (op) {
    case '+': return add(x, y);
    case '−': return subtract(x, y);
    case '×': return multiply(x, y);
    case '÷': return divide(x, y);
  }
}

// Will store the values
let operator = '';
let num1 = '';
let num2 = '';
let result = null;

const mainDisplay = document.querySelector('.display h1');
const subDisplay = mainDisplay.nextElementSibling;
const digitButtons = document.querySelectorAll('.button.digit');
const operatorButtons = document.querySelectorAll('.button.operator');


//---------------------------On digit click---------------------------------
digitButtons.forEach(button => button.addEventListener('click', handelDigitClick));

function handelDigitClick(event) {
  if (operator === '') {
    num1 += event.target.textContent;
    mainDisplay.textContent = num1;
  } else {
    num2 += event.target.textContent;
    // cant append num2 directly to mainDisplay, since it will append duplcate digits
    // so insted extract previous num2 from mainDisplay and replace it with the new one
    if (num2.length > 1) {
      let numbers = mainDisplay.textContent.split(operator); // Split the two numbers
      numbers[1] = ` ${num2}`;  // Change the second number to the new num2
      let newDisplyText = numbers.join(operator); // Create the new text
      mainDisplay.textContent = newDisplyText; // Display the new text
    }
    else {
      mainDisplay.textContent += num2;
    }
    result = operate(+num1, operator, +num2);
    subDisplay.textContent = result;

  }
}


//------------------------ On operator click-----------------------------------
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorClick));

function handleOperatorClick(event) {
  // Check to see if we are trying to make a number negative
  makeNumberNegative(event.target.textContent);

  // Prevnt multiple orperator click
  if (isOperatorReady()) {
    mainDisplay.textContent += ` ${event.target.textContent} `;
    operator = event.target.textContent;
    // operatorButtons.forEach(button => button.disabled = true);
    decimalButton.disabled = false;
  }
}

function isOperatorReady() {
  // Not ready for operator if number is NaN or we already have an operator
  if (num1.length === 0 || Number.isNaN(+num1) || operator !== '') {
    return false;
  }
  return true;
}

// On minus button clikc check to see if it's to make a number negative
function makeNumberNegative(symbol) {
  if (symbol === '−' || symbol === '-') {
    if (num1 === '') {
      num1 = '-';
      mainDisplay.textContent += num1;
      // return true;

      // makes sure we already have an operator before trying to make num2 negative
    } else if (operator !== '' && num2 === '') {
      num2 += '-';
      mainDisplay.textContent += num2;
      // return true;
    }
    // return false;
  }
}

//-----------------------Decimal Button Click------------------------------
const decimalButton = document.querySelector('.button.decimal');
decimalButton.addEventListener('click', handleDecimalClick);

function handleDecimalClick() {
  if (operator === '' && !num1.includes('.')) {
    num1 += '.';
    mainDisplay.textContent += '.';
    //decimalButton.disabled = true;  //Prevent adding aanymore decimals to the number
  } else if (operator !== '' && !num2.includes('.')) {
    num2 += '.';
    mainDisplay.textContent += '.';
  }

}

//------------------------------Show Result ---------------------------------------
const equalButton = document.querySelector('.button.equal');
equalButton.addEventListener('click', handleEqualClick);

function handleEqualClick() {
  if (isValidNumber(num1) && isValidNumber(num2)) {
    num1 = subDisplay.textContent;
    subDisplay.textContent = '';
    mainDisplay.textContent = num1;
    operator = '';
    num2 = '';
  }
}

function isValidNumber(number) {
  return (number !== '' && !Number.isNaN(+number));
}

// ---------------Clear and Delete-----------------------------------
const clearButton = document.querySelector('.button.clear');
const deleteButton = document.querySelector('.button.delete');

clearButton.addEventListener('click', clear);

function clear() {
  mainDisplay.textContent = '';
  subDisplay.textContent = '';
  num1 = num2 = operator = '';
}

deleteButton.addEventListener('click', handleDelete);

function handleDelete() {

  if (operator === '') {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    num1 = mainDisplay.textContent;
  } else if (operator !== '' && num2 === '') {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -3);
    operator = '';
  } else {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
    num2 = mainDisplay.textContent.split(operator)[1].trim();
  }
}

// --------------------------Keyborad Support --------------------
document.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
  let key = event.key;
  if (key >= '0' && key <= '9') {
    if (operator === '') {
      num1 += key;
      mainDisplay.textContent = num1;
    } else {
      num2 += key;
      // cant append num2 directly to mainDisplay, since it will append duplcate digits
      // so insted extract previous num2 from mainDisplay and replace it with the new one
      if (num2.length > 1) {
        let numbers = mainDisplay.textContent.split(operator); // Split the two numbers
        numbers[1] = ` ${num2}`;  // Change the second number to the new num2
        let newDisplyText = numbers.join(operator); // Create the new text
        mainDisplay.textContent = newDisplyText; // Display the new text
      } else {
        mainDisplay.textContent += num2;
      }
      result = operate(+num1, operator, +num2);
      console.log(result);
      subDisplay.textContent = result;
    }
  }
  else if (['+', '-', '*', '/'].includes(key)) {
    // Check to see if we are trying to make a number negative
    makeNumberNegative(key);

    // Prevnt multiple orperator click
    if (isOperatorReady()) {
  
      switch (key) {
        case '+':
          operator = key;
          break;
        case '-':
          operator = `−`;
          break;
        case '*':
          operator = `×`;
          break;
        case '/':
          operator = `÷`;
          break;
      }
      mainDisplay.textContent += ` ${operator} `;
    }
  }
  else if(key === '.') {
    handleDecimalClick();
  }
  else if(key === '=' || key === 'Enter') {
    handleEqualClick();
  }
  else if(key === 'Delete') {
   clear();
  }
  else if(key === 'Backspace') {
    handleDelete();
  }
  console.log(key);
}