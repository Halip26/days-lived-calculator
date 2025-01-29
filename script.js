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
  return dateObj.toLocaleDateString("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calculate() {
  const name = document.getElementById("name").value.trim();
  const resultContainer = document.querySelector(".result-container");

  try {
    const birthDate = getBirthDate();
    const formattedDate = formatDate(birthDate);
    const daysPassed = calculateDays(birthDate);

    resultContainer.innerHTML = `
                    <div class="separator"></div>
                    <div class="result">
                        You were born on ${formattedDate} and ${name}, you have lived for ${daysPassed} days
                    </div>
                `;
  } catch (error) {
    resultContainer.innerHTML = `
                    <div style="color: red; margin-top: 20px; text-align: center">
                        Error: Please enter a valid date!
                    </div>
                `;
  }
}
