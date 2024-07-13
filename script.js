"use strict"

// Fuctions used for calculation
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
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
    decimalButton.disabled  = false;
  }
}

function isOperatorReady() {
  // Not ready for operator if number is NaN or we already have an operator
  if (Number.isNaN(+num1) || operator !== '') {
    return false;
  }
  return true;
}

// On minus button clikc check to see if it's to make a number negative
function makeNumberNegative(symbol) {
  if (symbol === '−') {
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
  if(operator === '' && !num1.includes('.')) {
    num1 += '.';
    mainDisplay.textContent += '.';
    decimalButton.disabled = true;  //Prevent adding aanymore decimals to the number
  } else if(!num2.includes('.')) {
    num2 += '.';
    mainDisplay.textContent += '.';
  }
  
}

