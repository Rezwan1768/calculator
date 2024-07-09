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

