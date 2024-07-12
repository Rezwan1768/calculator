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

// Do operation based on operator
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
let hasOperatorChanged = false; // Used to check if operator has changed

console.log(operate(.5, '+', .2));
console.log(operate(.5, '−', .2));
console.log(operate(.5, '×', .2));
console.log(operate(.5, '÷', .2));


const mainDisplay = document.querySelector('h1');
const subDisplay = mainDisplay.nextElementSibling;
const digitButtons = document.querySelectorAll('.button.digit');
const operatorButtons = document.querySelectorAll('.button.operator');

// Display digits
digitButtons.forEach(button => button.addEventListener('click', handleDigitClick));

function handleDigitClick(event) {
  if (operator === '') {
    num1 += event.target.textContent;
    mainDisplay.textContent = num1;

  }
  else {
    num2 += event.target.textContent;
    mainDisplay.textContent = num2;
    let result = operate(+num1, operator, +num2);
    subDisplay.textContent = result;

    // Alow for operation to be chained
    // if (hasOperatorChanged) {
    //   num1 = result;
    //   num2 = '';
    //   subDisplay.textContent = num1;
    //   hasOperatorChanged = false;
    //   // console.log(num1);
    // }
  }
}


// Display Operator
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorClick))

function handleOperatorClick(event) {
  if (operator !== '')
    hasOperatorChanged = true;
  operator = event.target.textContent;
  if(!hasOperatorChanged)
    mainDisplay.textContent += ` ${operator} `;
  else {
    num1 = subDisplay.textContent;
    mainDisplay.textContent = `${num1} ${operator} `;
    num2 = '';
    hasOperatorChanged = false;
  }
  // console.log(operator, prevOperator);
}