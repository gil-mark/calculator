let buttons = document.querySelectorAll('button');
for (const button of buttons) {
    button.addEventListener('click', (e) => click(e));
}

let operand1 = 0;
let operator = '';
let operand2 = 0;

function click(e) {
    let buttonId = e.srcElement.id;
    
    
    if (buttonId === 'clear') { 
        clear()
    }
    
    //if it's a digit, add it to one of the operands
    if (/^\d+$/.test(+buttonId)) {
        addToScreen(buttonId);
        if (!operator) { 
            operand1 += buttonId;
        } else {
            operand2 += buttonId;
        }
    }

    //if it's an operator, set the operator and add to screen
    if ('+-*/'.includes(buttonId)) {
        addToScreen(` ${buttonId} `);
        operator = buttonId;
    }

    //if =, calculate
    if (buttonId === '=') {
        if (!operator) { return }
        
        let result = calculate(+operand1, operator, +operand2);
        clear()
        addToScreen(result);
        operand1 = result;
    }
}

function addToScreen(input) {
    let screen = document.querySelector('#screen span');
    screen.innerText += input;
}

function clear() {
    let screen = document.querySelector('#screen span');
    screen.innerText = ''
    operand1 = 0
    operator = ''
    operand2 = 0
}

function calculate(operand1, operator, operand2) {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
    }
}