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
let operator = null;
let num1 = null;
let num2 = null;

// Display button contentsgit 
const display = document.querySelector('h1');
const digitButtons = document.querySelectorAll('button.digit');
const operatorButtons = document.querySelectorAll('button.operator')
digitButtons.forEach(button => button.addEventListener('click', displayDigit));
operatorButtons.forEach(button => button.addEventListener('click', displayOperator));

function displayDigit(event) {
  let element = event.target;
  if (isDisplayEmpty())
    display.textContent = element.textContent;
  else {
    display.textContent += element.textContent;
  }
}

function displayOperator(event) {
  let element = event.target;
  display.textContent += ` ${element.textContent} `;
  operator = element.textContent;
}

function isDisplayEmpty() {
  return display.textContent === "Calculator";
}

// Equal(=) button
document.querySelector('.equal').addEventListener('click', displayResult)

function displayResult() {
  [num1, num2] = display.textContent
    .split(operator)
    .map(number => parseInt(number));
    let results = operate(num1, operator, num2);
    display.textContent = results;
}
// Clear button
document.querySelector('.clear')
  .addEventListener('click', () => display.textContent = '');