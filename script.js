const inputLabel = document.querySelector(".input-container p");
const outputLabel = document.querySelector(".output-container p");

const inputField = document.getElementById("input-number");
const outputField = document.getElementById("output-number");

const selectFrom = document.getElementById("select-from");
const selectTo = document.getElementById("select-to");

const exchangeIcon = document.querySelector(".exchange-icon");

const errorBox = document.querySelector(".error-box");

const form = document.querySelector("form");
const convertButton = document.querySelector("convert-btn");


function updateLabels() {
    let inputSystem = selectFrom.options[selectFrom.selectedIndex].text;
    let outputSystem = selectTo.options[selectTo.selectedIndex].text;

    inputLabel.textContent = inputSystem;
    outputLabel.textContent = outputSystem;
}


function validateInput() {
    let inputValue = inputField.value;
    let system = selectFrom.value;

    if (!isValidInSystem(inputValue, system)) {
        errorBox.classList.remove("disabled-box");
    } else {
        errorBox.classList.add("disabled-box");
    }
}


inputField.addEventListener("input", validateInput);

selectFrom.addEventListener("change", function () {
    updateLabels();
    validateInput();
});

selectTo.addEventListener("change", function () {
    updateLabels();
    validateInput();
});

exchangeIcon.addEventListener("click", function () {
    let inputSystem = selectFrom.value;
    let outputSystem = selectTo.value;

    selectFrom.value = outputSystem;
    selectTo.value = inputSystem;

    updateLabels();
    validateInput();
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
});

updateLabels();
