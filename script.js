"use strict"

// -------------------Fucntions for basic operation---------------------
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
  switch(op) {
    case '+': return add(x, y);
    case '-': return subtract(x, y);
    case '*': return multiply(x, y);
    case '/': return divide(x, y);
  }
}

let operator = null;
let num1 = null;
let num2 = null;

const display = document.querySelector('h1');
const digitButtons = document.querySelectorAll('button.digit');
const operatorButtons = document.querySelectorAll('button.operator')
digitButtons.forEach(button => button.addEventListener('click', displayDigit));
operatorButtons.forEach(button => button.addEventListener('click', displayOperator));

function displayDigit(event) {
  let element = event.target;
  if(isDisplayEmpty()) 
    display.textContent = element.textContent;
  else {
    display.textContent += element.textContent;
  }
}

function displayOperator(event) {
  let element = event.target;
  display.textContent += ` ${element.textContent} `; 
  operator = element.textContent;
  console.log(operator);
}

// Helper Functions
function isDisplayEmpty() {
  return display.textContent === "Calculator";
}