function click(e) {
    let buttonId = e.srcElement.id;
    let buttonClass = e.srcElement.className;
    //console.log(e)
    
    if (buttonClass === 'num') {
        ('+-/*'.includes(expression[expression.length - 1])) ? screen.innerText += ' ' + buttonId : screen.innerText += buttonId;
        expression.push(+buttonId);
    }

    if (buttonId === '.') {
        screen.innerText += buttonId;
        expression.push(buttonId);
    }
    
    if (buttonClass === 'operator') {
        if (expression.length === 0 || '+-/*'.includes(expression[expression.length - 1])) { return }

        if (expression.length >= 3 && operatorIndex) {
            calculate();
        }

        screen.innerText += ' ' + buttonId;
        expression.push(buttonId);

        operatorIndex = expression.length - 1;
    }

    if (buttonId === '=') {
        calculate()
    }

    if (buttonId === 'clear') {
        expression = [];
        screen.innerText = '';
        operatorIndex = undefined;
    }

    if (buttonId === 'delete') {
        discard = expression.pop();
        screen.innerText = screen.innerText.slice(0, screen.innerText.length - 2); 
    }
    
    console.log(expression);
}

function calculate() {
    if (!operatorIndex || '+-*/'.includes(expression[expression.length - 1])) { return }

    let operator = expression[operatorIndex];
    let a = +expression.slice(0, operatorIndex).join('');
    let b = +expression.slice(operatorIndex + 1).join('');

    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }

    screen.innerText = result;
    expression = [result];
    operatorIndex = undefined;

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
}

let buttons = document.querySelectorAll('button');
for (const button of buttons) {
    button.addEventListener('click', (e) => click(e));
}

let screen = document.querySelector('#screen span');
let expression = [];
let operatorIndex;
let result;
let discard;