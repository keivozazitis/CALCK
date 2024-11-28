let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
const display = document.getElementById('display');
const historyList = document.getElementById('historyList');

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    const result = eval(display.value);
    display.value = result;
    addToHistory(display.value);
  } catch (error) {
    display.value = 'errors fujak';
  }
}

function addToHistory(result) {
  history.push(result);
  localStorage.setItem('calcHistory', JSON.stringify(history));
  updateHistoryList();
}

function updateHistoryList() {
  historyList.innerHTML = '';
  history.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Dzēst';
    deleteButton.onclick = () => deleteHistoryItem(index);

    li.appendChild(deleteButton);
    historyList.appendChild(li);
  });
}

function deleteHistoryItem(index) {
  history.splice(index, 1);
  localStorage.setItem('calcHistory', JSON.stringify(history));
  updateHistoryList();
}

function clearHistory() {
  history = [];
  localStorage.removeItem('calcHistory');
  updateHistoryList();
}

function handleKeyDown(event) {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    appendToDisplay(key);
  } else if ('+-*/.'.includes(key)) {
    appendToDisplay(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === 'c' || key === 'C') {
    clearDisplay();
  }
}

updateHistoryList();

document.addEventListener('keydown', handleKeyDown);