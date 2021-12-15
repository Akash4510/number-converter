const NumberSystems = {
    "binary": {
        "baseValue": 2,
        "numbers": [0, 1]
    },

    "octal": {
        "baseValue": 8,
        "numbers": [0, 1, 2, 3, 4, 5, 6, 7]
    },

    "decimal": {
        "baseValue": 10,
        "numbers": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },

    "hexadecimal": {
        "baseValue": 16,
        "numbers": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
    }
}


function isValidSystem(system) {
    let sys = String(system).toLowerCase();

    // Checking if the given system is valid
    if (!Object.keys(NumberSystems).includes(sys)) {
        return false;
    }

    return true;
}


function isValidInSystem(num, system) {

    let n = String(num).toUpperCase();
    let sys = String(system).toLowerCase();

    // Checking if the given system is valid
    if (!isValidSystem(sys)) {
        console.log("Please enter a valid system!");
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
    let validNumbers = NumberSystems[sys]["numbers"];
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


if (isValidInSystem("1111010.110101", "Binary")) {
    console.log("Valid");
} else {
    console.log("Invalid");
}
