document.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  const url = "https://microsoft-translator-text-api3.p.rapidapi.com/languages";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "b69fa9c6f4msha8cfd29c755c4dep167cadjsn349934920e6e",
      "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const resultArray = Object.entries(result.translation).map(
      ([key, value]) => {
        return {
          languageCode: key,
          ...value,
        };
      }
    );

    resultArray.map((v) => {
      displayLanguages(v);
      displayLanguages(v, false);
    });
  } catch (error) {
    console.error(error);
  }
});

function displayLanguages(language, isFrom = true) {
  const selectDrop1 = document.querySelector("#from");
  const selectDrop2 = document.querySelector("#to");
  const option = document.createElement("option");
  option.text = language.name;
  option.value = language.languageCode;
  if (isFrom) {
    selectDrop1.appendChild(option);
  } else {
    selectDrop2.appendChild(option);
  }
}

const buttonClick = document.getElementById("translate");

buttonClick.addEventListener("click", async (e) => {
  e.preventDefault();

  // Get selected languages and text
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  const fromLanguage = fromSelect.options[fromSelect.selectedIndex].value;
  const toLanguage = toSelect.options[toSelect.selectedIndex].value;
  const textToTranslate = document.getElementById("textToTranslate").value;

  const translateUrl = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?api-version=3.0&from=${fromLanguage}&to=${toLanguage}`;
  const translateOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "b69fa9c6f4msha8cfd29c755c4dep167cadjsn349934920e6e",
      "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
    },
    body: JSON.stringify([{ Text: textToTranslate }]),
  };

  try {
    const translateResponse = await fetch(translateUrl, translateOptions);
    const translateResult = await translateResponse.json();

    // Assuming the API response format contains the translation here
    const translatedText = translateResult[0].translations[0].text;

    // Display the translation result
    const resultDisplay = document.getElementById("translateContainer");
    resultDisplay.textContent = translatedText;
  } catch (error) {
    console.error(error);
  }
});
