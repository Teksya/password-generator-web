const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const specialChars = "!@#$%^&*()_-+=[]{}|;:,.<>?";
const similarChars = "il1Lo0O";
const numberChars = "0123456789";

function generatePasswords() {
  const length = parseInt(document.getElementById("length").value);
  const uppercase = document.getElementById("uppercase").checked;
  const lowercase = document.getElementById("lowercase").checked;
  const special = document.getElementById("special").checked;
  const numbers = document.getElementById("numbers").checked;
  const avoidSimilar = document.getElementById("avoid-similar").checked;
  const quantity = parseInt(document.getElementById("quantity").value);

  const availableChars = (uppercase ? uppercaseChars : "") +
    (lowercase ? lowercaseChars : "") +
    (special ? specialChars : "") +
    (numbers ? numberChars : "");

  let passwords = [];
  while (passwords.length < quantity) {
    let password = "";
    while (password.length < length) {
      const char = availableChars.charAt(Math.floor(Math.random() * availableChars.length));
      if (avoidSimilar && similarChars.includes(char)) {
        continue;
      }
      password += char;
    }
    passwords.push(password);
  }

  displayPasswords(passwords);
}

function displayPasswords(passwords) {
  const resultContainer = document.getElementById("generpassword"); // Get the newly added div
  resultContainer.innerHTML = ""; // Clear previous content

  passwords.forEach((password, index) => {
    const passwordElement = document.createElement("p");
    passwordElement.textContent = `Password ${index + 1}: ${password}`;

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", function () {
      copyToClipboard(password);
      alert("Password copied to clipboard!");
    });

    passwordElement.appendChild(copyButton);

    resultContainer.appendChild(passwordElement);
  });
}

function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function downloadCSV() {
  const passwords = Array.from(document.querySelectorAll("#generpassword p")).map(p => p.textContent.split(": ")[1]);
  const csvContent = "Number,Password\n" + passwords.map((password, index) => `${index + 1},${password}`).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "generated_passwords.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function displayPasswords(passwords) {
  const resultContainer = document.getElementById("generpassword");
  resultContainer.innerHTML = "";

  passwords.forEach((password, index) => {
    const passwordElement = document.createElement("p");
    passwordElement.textContent = `Password ${index + 1}: ${password}`;

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", function () {
      copyToClipboard(password);
      alert("Password copied to clipboard!");
    });

    passwordElement.appendChild(copyButton);

    resultContainer.appendChild(passwordElement);
  });

  if (passwords.length > 0) {
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Télécharger";
    downloadButton.addEventListener("click", downloadCSV);

    resultContainer.appendChild(downloadButton);
  }
}
