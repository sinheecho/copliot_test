const display = document.getElementById('display');
let current = '0';
let operator = null;
let operand = null;
let resetNext = false;

function updateDisplay() {
  display.textContent = current;
}

function inputNumber(num) {
  if (resetNext) {
    current = num;
    resetNext = false;
  } else {
    if (current === '0') {
      current = num;
    } else {
      current += num;
    }
  }
  updateDisplay();
}

function inputDot() {
  if (resetNext) {
    current = '0.';
    resetNext = false;
  } else if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay();
}

function clearAll() {
  current = '0';
  operator = null;
  operand = null;
  resetNext = false;
  updateDisplay();
}

function inputOperator(op) {
  if (operator && !resetNext) {
    calculate();
  }
  operand = parseFloat(current);
  operator = op;
  resetNext = true;
}

function calculate() {
  if (operator && operand !== null) {
    let result = operand;
    const curr = parseFloat(current);
    switch (operator) {
      case '+': result += curr; break;
      case '-': result -= curr; break;
      case '×': result *= curr; break;
      case '÷': result = curr === 0 ? '오류' : result / curr; break;
      default: break;
    }
    current = String(result);
    operator = null;
    operand = null;
    resetNext = true;
    updateDisplay();
  }
}

function inputPercent() {
  current = String(parseFloat(current) / 100);
  updateDisplay();
}

function inputPM() {
  if (current !== '0') {
    if (current.startsWith('-')) {
      current = current.slice(1);
    } else {
      current = '-' + current;
    }
    updateDisplay();
  }
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const text = btn.textContent;
    if (btn.classList.contains('number')) {
      inputNumber(text);
    } else if (btn.classList.contains('dot')) {
      inputDot();
    } else if (btn.classList.contains('operator')) {
      inputOperator(text);
    } else if (btn.classList.contains('equal')) {
      calculate();
    } else if (btn.classList.contains('ac')) {
      clearAll();
    } else if (btn.classList.contains('percent')) {
      inputPercent();
    } else if (btn.classList.contains('pm')) {
      inputPM();
    }
  });
});

updateDisplay();
