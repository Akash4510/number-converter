function isValidSystem(system) {
    let sys = String(system).toLowerCase();

    // Checking if the given system is valid
    if (!Object.keys(NUMBER_SYSTEMS).includes(sys)) {
        console.log("Please enter a valid system!");
        return false;
    }

    return true;
}


function isValidInSystem(num, system) {

    let n = String(num).toUpperCase();
    let sys = String(system).toLowerCase();

    // Checking if the given system is valid
    if (!isValidSystem(sys)) {
        return;
    }

    // Returning false if the given number contains more than one dots
    let dotCount = 0;
    for (let index = 0; index < n.length; index++) {
        if (n[index] === ".") {
            dotCount++;
        }
    }

    if (dotCount > 1) {
        return false;
    }

    // Removing the dots from the number
    n = n.replace(/\./g, "");

    // Looping through all the digits and checking if the digit is valid in the given number system
    let validNumbers = NUMBER_SYSTEMS[sys]["numbers"];
    validNumbers = validNumbers.map(function (i) {
        return String(i);
    })
    for (let index = 0; index < n.length; index++) {
        if (!validNumbers.includes(n[index])) {
            console.log(n[index] + " is not valid in " + sys + " number system.");
            return false;
        }
    }
    return true;
}


function formatNumber(num) {
    let n = String(num).toUpperCase();
    if (n.charAt(n.length - 1) === ".") {
        n = n.replace(/\./g, "");
    }
    return n;
}


function getIntegralPart(num) {
    // Check if the given num is valid in hexadecimal
    if (!isValidInSystem(num, sys = "hexadecimal")) {
        return String(NaN);
    }

    let n = String(num);

    let dotCount = 0;
    for (let index = 0; index < n.length; index++) {
        if (n[index] === ".") {
            dotCount++;
        }
    }

    if (dotCount > 1) {
        throw "Invalid number";
    }

    if (!n.includes(".")) {
        return n;
    } else {
        return n.split(".")[0];
    }
}

function getFractionalPart(num) {
    // Check if the given num is valid in hexadecimal
    if (!isValidInSystem(num, sys = "hexadecimal")) {
        return String(NaN);
    }

    let n = String(num);

    let dotCount = 0;
    for (let index = 0; index < n.length; index++) {
        if (n[index] === ".") {
            dotCount++;
        }
    }

    if (dotCount > 1) {
        throw "Invalid number";
    }

    if (!n.includes(".")) {
        return "0";
    } else {
        return n.split(".")[1];
    }
}

function reverseString(str) {
    return str.split("").reverse().join("");
}
