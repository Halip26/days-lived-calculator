// Load saved inputs
window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("dayCalculatorData"));
  if (savedData) {
    document.getElementById("name").value = savedData.name || "";
    document.getElementById("day").value = savedData.day || "";
    document.getElementById("month").value = savedData.month || "";
    document.getElementById("year").value = savedData.year || "";
  }
});

function saveInputs() {
  const dataToSave = {
    name: document.getElementById("name").value.trim(),
    day: document.getElementById("day").value,
    month: document.getElementById("month").value,
    year: document.getElementById("year").value,
  };
  localStorage.setItem("dayCalculatorData", JSON.stringify(dataToSave));
}

function getBirthDate() {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value) - 1;
  const year = parseInt(document.getElementById("year").value);

  return new Date(year, month, day);
}

function calculateDays(birthDate) {
  const today = new Date();
  const timeDiff = today - birthDate;
  return Math.floor(timeDiff / (1000 * 3600 * 24));
}

function formatDate(dateObj) {
  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calculate(event) {
  // add event handling and basic input validation
  event.preventDefault();
  const form = document.getElementById("dateForm");
  const name = document.getElementById("name").value.trim();
  const resultContainer = document.querySelector(".result-container");

  // Clear previous result
  resultContainer.innerHTML = "";

  try {
    const birthDate = getBirthDate();
    const formattedDate = formatDate(birthDate);
    const daysPassed = calculateDays(birthDate);

    // Save inputs to localStorage
    saveInputs();

    // Create result element
    const resultDiv = document.createElement("div");
    resultDiv.className = "result";
    resultDiv.innerHTML = `
                    <span class="date-part">${formattedDate}</span>
                    <span>is the date you were born </span>
                    <span class="name-part">${name}</span>
                    <span>and you have been living</span>
                    <span class="days-part">${daysPassed} days 🥳</span>
                `;

    // Add animation
    resultDiv.classList.add("result-animation");

    // Add separator
    const separator = document.createElement("div");
    separator.className = "separator";

    resultContainer.appendChild(separator);
    resultContainer.appendChild(resultDiv);

    // Trigger animation
    setTimeout(() => {
      resultDiv.classList.add("show");
    }, 50);
  } catch (error) {
    resultContainer.innerHTML = `
                    <div style="color: red; margin-top: 20px; text-align: center">
                        Error: Please enter a valid date!
                    </div>
                `;
  }
}
