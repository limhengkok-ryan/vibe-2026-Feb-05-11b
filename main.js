document.addEventListener('DOMContentLoaded', () => {
  const horoscopeSelect = document.getElementById('horoscope-select');
  const currentDateElement = document.getElementById('current-date');
  const huatButton = document.getElementById('huat-button');
  const luckyColorTableBody = document.querySelector('#lucky-color-table tbody');
  const quoteContainer = document.getElementById('quote-of-the-day');
  const quoteText = document.getElementById('quote-text');

  const today = new Date();
  currentDateElement.textContent = today.toDateString();

  const luckyColors = {
    aries: { primary: "Red", secondary: ["Coral", "HotPink"] },
    taurus: { primary: "Green", secondary: ["Pink", "Emerald"] },
    gemini: { primary: "Yellow", secondary: ["LightBlue", "Orange"] },
    cancer: { primary: "Silver", secondary: ["White", "SeaGreen"] },
    leo: { primary: "Gold", secondary: ["Orange", "Yellow"] },
    virgo: { primary: "Navy", secondary: ["Brown", "Grey"] },
    libra: { primary: "Blue", secondary: ["Pink", "Lavender"] },
    scorpio: { primary: "Black", secondary: ["Red", "Maroon"] },
    sagittarius: { primary: "Purple", secondary: ["DarkBlue", "Plum"] },
    capricorn: { primary: "Black", secondary: ["Brown", "Charcoal"] },
    aquarius: { primary: "Blue", secondary: ["Turquoise", "Aquamarine"] },
    pisces: { primary: "SeaGreen", secondary: ["Lilac", "Violet"] },
  };

  const quotes = [
    "The best way to predict the future is to create it.",
    "Your limitation is only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
  ];

  const allColors = [...new Set(Object.values(luckyColors).flatMap(c => [c.primary, ...c.secondary]))];
  const darkColors = ["Red", "Green", "Navy", "Black", "Maroon", "Purple", "DarkBlue", "Brown", "Charcoal"];

  horoscopeSelect.addEventListener('change', () => {
    luckyColorTableBody.innerHTML = '';
    quoteContainer.style.display = 'none';
  });

  const animate = (cell, finalColor, duration) => {
    const startTime = Date.now();
    let interval = 50;
    let timeoutId;

    function spin() {
        const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
        cell.textContent = randomColor;
        cell.style.backgroundColor = randomColor;
        cell.style.color = darkColors.includes(randomColor) ? 'white' : 'black';

        const elapsed = Date.now() - startTime;
        if (elapsed < duration - 700) {
            timeoutId = setTimeout(spin, interval);
        } else if (elapsed < duration) {
            interval *= 1.2;
            timeoutId = setTimeout(spin, interval);
        } else {
            cell.textContent = finalColor;
            cell.style.backgroundColor = finalColor;
            cell.style.color = darkColors.includes(finalColor) ? 'white' : 'black';
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteText.textContent = `"${randomQuote}"`;
            quoteContainer.style.display = 'block';
        }
    }

    spin();
  };


  const startAnimation = (primaryColor, secondaryColor) => {
    luckyColorTableBody.innerHTML = '';
    quoteContainer.style.display = 'none';
    const primaryRow = document.createElement('tr');
    const primaryLabelCell = document.createElement('td');
    const primaryColorCell = document.createElement('td');
    primaryLabelCell.textContent = 'Primary';
    primaryLabelCell.className = 'py-3 pr-4 font-medium text-gray-600 text-right';
    primaryColorCell.className = 'py-4 px-6 text-xl font-bold rounded-lg shadow-md';
    primaryRow.appendChild(primaryLabelCell);
    primaryRow.appendChild(primaryColorCell);

    const secondaryRow = document.createElement('tr');
    const secondaryLabelCell = document.createElement('td');
    const secondaryColorCell = document.createElement('td');
    secondaryLabelCell.textContent = 'Secondary';
    secondaryLabelCell.className = 'py-3 pr-4 font-medium text-gray-600 text-right';
    secondaryColorCell.className = 'py-4 px-6 text-xl font-bold rounded-lg shadow-md';
    secondaryRow.appendChild(secondaryLabelCell);
    secondaryRow.appendChild(secondaryColorCell);

    luckyColorTableBody.appendChild(primaryRow);
    luckyColorTableBody.appendChild(secondaryRow);

    animate(primaryColorCell, primaryColor, 1500);
    animate(secondaryColorCell, secondaryColor, 2200);
  };

  huatButton.addEventListener('click', () => {
    const selectedHoroscope = horoscopeSelect.value;
    if (selectedHoroscope) {
      const { primary, secondary } = luckyColors[selectedHoroscope];
      const randomSecondaryColor = secondary[Math.floor(Math.random() * secondary.length)];
      startAnimation(primary, randomSecondaryColor);
    }
  });
});