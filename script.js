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

const swapBtn = document.querySelector(".swap-btn");
const resetBtn = document.querySelector(".reset-btn");

const numConverter = new NumberSystemConverter();


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

function swap() {
    let inputSystem = selectFrom.value;
    let outputSystem = selectTo.value;

    selectFrom.value = outputSystem;
    selectTo.value = inputSystem;

    updateLabels();
    validateInput();

    if (inputField.value != "") {
        let inputNumber = inputField.value;
        let outputNumber = numConverter.convert(inputNumber, selectFrom.value, selectTo.value);
        outputField.value = outputNumber;
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

exchangeIcon.addEventListener("click", swap);

swapBtn.addEventListener("click", swap);

resetBtn.addEventListener("click", function () {
    selectFrom.value = "decimal";
    selectTo.value = "binary";

    inputField.value = "";
    outputField.value = "";
    updateLabels();
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputNumber = inputField.value;

    let inputSystem = selectFrom.value;
    let outputSystem = selectTo.value;

    if (inputNumber.length = 0) {
        errorBox.classList.add("disabled-box");
    }

    let outputNumber = numConverter.convert(inputNumber, inputSystem, outputSystem);
    outputField.value = outputNumber;

});

updateLabels();
