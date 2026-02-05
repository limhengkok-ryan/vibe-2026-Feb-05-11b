document.addEventListener('DOMContentLoaded', () => {
  const horoscopeSelect = document.getElementById('horoscope-select');
  const currentDateElement = document.getElementById('current-date');
  const huatButton = document.getElementById('huat-button');
  const luckyColorTableBody = document.querySelector('#lucky-color-table tbody');

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

  horoscopeSelect.addEventListener('change', () => {
    luckyColorTableBody.innerHTML = '';
  });

  huatButton.addEventListener('click', () => {
    const selectedHoroscope = horoscopeSelect.value;
    if (selectedHoroscope) {
      const { primary, secondary } = luckyColors[selectedHoroscope];
      const randomSecondaryColor = secondary[Math.floor(Math.random() * secondary.length)];

      luckyColorTableBody.innerHTML = ''; // Clear previous results

      const colors = [
        { label: 'Primary', color: primary },
        { label: 'Secondary', color: randomSecondaryColor }
      ];

      colors.forEach(item => {
        const row = document.createElement('tr');
        const labelCell = document.createElement('td');
        const colorCell = document.createElement('td');

        labelCell.textContent = item.label;
        labelCell.className = 'py-3 pr-4 font-medium text-gray-600 text-right';

        colorCell.textContent = item.color;
        colorCell.style.backgroundColor = item.color;
        colorCell.className = 'py-4 px-6 text-xl font-bold rounded-lg shadow-md';

        const darkColors = ["Red", "Green", "Navy", "Black", "Maroon", "Purple", "DarkBlue", "Brown", "Charcoal"];
        if (darkColors.includes(item.color)) {
          colorCell.style.color = "white";
        }

        row.appendChild(labelCell);
        row.appendChild(colorCell);
        luckyColorTableBody.appendChild(row);
      });
    }
  });
});