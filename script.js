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


//Dispaly digits on click
digitButtons.forEach(button => button.addEventListener('click', handelDigitClick));

function handelDigitClick(event) {
  if (operator === '') {
    num1 += event.target.textContent;
    mainDisplay.textContent = num1;
  } else {
    num2 += event.target.textContent;
    // get the num2 portion and splice?
    if (num2.length > 1) {
      let slicedNum= num2.slice(0, -1);
      let numbers = mainDisplay.textContent.split(operator);
      numbers[1] = ` ${num2}`;
      let newDisplyText = numbers.join(operator);
      mainDisplay.textContent = newDisplyText;
      
    }
    else {
      mainDisplay.textContent += num2;
    }
    result = operate(+num1, operator, +num2);
    subDisplay.textContent = result;
    
  }


}


// On operator click
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorClick));

function handleOperatorClick(event) {
  mainDisplay.textContent += ` ${event.target.textContent} `;
  operator = event.target.textContent;

}

// Show Result
// const equalButton = document.querySelector('.button.equal');
// equalButton.addEventListener('click', () => )

// function handleEqualClick() {

// }