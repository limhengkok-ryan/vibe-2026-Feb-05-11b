document.addEventListener('DOMContentLoaded', () => {
  const horoscopeSelect = document.getElementById('horoscope-select');
  const currentDateElement = document.getElementById('current-date');
  const huatButton = document.getElementById('huat-button');
  const luckyColorTableBody = document.querySelector('#lucky-color-table tbody');
  const quoteContainer = document.getElementById('quote-of-the-day');
  const quoteText = document.getElementById('quote-text');
  const themeToggleButton = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const genderButtons = document.querySelectorAll('.gender-button');
  const modelPhotoContainer = document.getElementById('model-photo-container');
  const modelPhoto = document.getElementById('model-photo');
  const suggestedClothingHeader = document.getElementById('suggested-clothing-header');

  let selectedGender = null;
  const UNSPLASH_API_KEY = 'mEblEuTARfBqgEtkOCrGD_ggoi-MDCSsyjB1Gzm2MPU';

  // Theme toggle logic
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
    darkIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    lightIcon.classList.add('hidden');
    darkIcon.classList.remove('hidden');
  }

  themeToggleButton.addEventListener('click', () => {
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      }
    }
  });

  genderButtons.forEach(button => {
    button.addEventListener('click', () => {
        genderButtons.forEach(btn => {
            btn.classList.remove('bg-blue-500', 'text-white');
            btn.classList.add('border', 'dark:text-white', 'border-gray-300', 'dark:border-gray-600');
        });
        
        button.classList.add('bg-blue-500', 'text-white');
        button.classList.remove('border', 'dark:text-white', 'border-gray-300', 'dark:border-gray-600');
        selectedGender = button.dataset.gender;
    });
  });

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

  const colorSearchMap = {
    "Coral": "Orange",
    "HotPink": "Pink",
    "Emerald": "Green",
    "LightBlue": "Blue",
    "Silver": "Grey",
    "SeaGreen": "Green",
    "Navy": "Blue",
    "Lavender": "Purple",
    "Maroon": "Red",
    "DarkBlue": "Blue",
    "Plum": "Purple",
    "Charcoal": "Grey",
    "Turquoise": "Blue",
    "Aquamarine": "Blue",
    "Lilac": "Purple",
    "Violet": "Purple",
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
    modelPhotoContainer.style.display = 'none';
  });

  const fetchModelPhoto = async (gender, primaryColor, secondaryColor) => {
    const searchPrimaryColor = colorSearchMap[primaryColor] || primaryColor;
    const searchSecondaryColor = colorSearchMap[secondaryColor] || secondaryColor;
    const query = `${gender} model wearing ${searchPrimaryColor} and ${searchSecondaryColor} clothes`;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        modelPhoto.src = data.results[0].urls.regular;
        modelPhotoContainer.style.display = 'block';
        suggestedClothingHeader.style.display = 'block';
      } else {
        modelPhotoContainer.style.display = 'none';
        suggestedClothingHeader.style.display = 'none';
        console.warn('No images found for the query:', query);
      }
    } catch (error) {
      console.error('Error fetching image from Unsplash:', error);
      modelPhotoContainer.style.display = 'none';
      suggestedClothingHeader.style.display = 'none';
    }
  };

  const animate = (cell, finalColor, duration, isLastAnimation, primaryColor, secondaryColor) => {
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

            if (isLastAnimation) {
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                quoteText.textContent = `"${randomQuote}"`;
                quoteContainer.style.display = 'block';

                if (selectedGender) {
                    fetchModelPhoto(selectedGender, primaryColor, secondaryColor);
                }
            }
        }
    }

    spin();
  };


  const startAnimation = (primaryColor, secondaryColor) => {
    luckyColorTableBody.innerHTML = '';
    quoteContainer.style.display = 'none';
    modelPhotoContainer.style.display = 'none';
    suggestedClothingHeader.style.display = 'none';
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

    animate(primaryColorCell, primaryColor, 1500, false);
    animate(secondaryColorCell, secondaryColor, 2200, true, primaryColor, secondaryColor);
  };

  huatButton.addEventListener('click', () => {
    const selectedHoroscope = horoscopeSelect.value;
    if (!selectedGender) {
        alert('Please select a gender.');
        return;
    }
    if (selectedHoroscope) {
      const { primary, secondary } = luckyColors[selectedHoroscope];
      const randomSecondaryColor = secondary[Math.floor(Math.random() * secondary.length)];
      startAnimation(primary, randomSecondaryColor);
    }
  });
});