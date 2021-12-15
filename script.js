const inputField = document.getElementById("input-number");
const outputField = document.getElementById("output-number");

const selectFrom = document.getElementById("select-from");
const selectTo = document.getElementById("select-to");

const errorBox = document.querySelector(".error-box");

const form = document.querySelector("form");
const convertButton = document.querySelector("convert-btn");

inputField.addEventListener("input", function () {
    let inputValue = inputField.value;
    let system = selectFrom.value;

    if (!isValidInSystem(inputValue, system)) {
        errorBox.classList.remove("disabled-box");
    } else {
        errorBox.classList.add("disabled-box");
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
});
