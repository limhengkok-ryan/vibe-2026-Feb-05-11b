const numbersContainer = document.getElementById('numbers-container');
const generateBtn = document.getElementById('generate-btn');

function generateTotoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNum = Math.floor(Math.random() * 49) + 1;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
}

function displayNumbers(numbers) {
  numbersContainer.innerHTML = '';
  for (const number of numbers) {
    const numberBall = document.createElement('div');
    numberBall.classList.add('number-ball');
    numberBall.textContent = number;
    numbersContainer.appendChild(numberBall);
  }
}

function generateAndDisplayNumbers() {
    const totoNumbers = generateTotoNumbers();
    displayNumbers(totoNumbers);
}

generateBtn.addEventListener('click', generateAndDisplayNumbers);

// Initial generation
generateAndDisplayNumbers();
