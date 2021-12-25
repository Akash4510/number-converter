const NUMBER_SYSTEMS = {
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


class NumberSystem {
    constructor(num, sys) {
        this.number = formatNumber(num);
        this.system = String(sys).toLowerCase();

        if (!isValidInSystem(num, sys)) {
            outputField.value = "ERROR!";
            throw "The given number " + num + " is not valid in " + sys + " system.";
        }

        this.baseValue = NUMBER_SYSTEMS[sys].baseValue;
        this.validNumbers = NUMBER_SYSTEMS[sys].numbers;

        this.inSystem = {
            "binary": this.toSystem("binary"),
            "octal": this.toSystem("octal"),
            "decimal": this.toSystem("decimal"),
            "hexadecimal": this.toSystem("hexadecimal")
        }
        
    }

    toDecimal() {
        let valuesOfLettersInHex = {
            "a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15,
        }

        let currentPower = getIntegralPart(this.number).length - 1;
        let total = 0;

        let num = this.number.replace(".", "").toLowerCase();
        for (let i = 0; i < num.length; i++) {
            let n = num.charAt(i);
            // if the number is a hexadecimal number it may include a, b, c, d, e and f
            if (Object.keys(valuesOfLettersInHex).includes(n)) {
                n = valuesOfLettersInHex[n];  // Replacing a with 10, b with 11 and so on..
            }

            total += (Number(n) * this.baseValue ** currentPower);
            currentPower--;
        }

        return formatNumber(total);
    }

    toSystem(sys) {
        if (!isValidSystem(sys)) {
            return "Invalid System";
        }

        // First convert the number into decimal number system.
        let number = this.toDecimal()

        let system = String(sys).toLowerCase();
        let baseValue = NUMBER_SYSTEMS[system]["baseValue"];

        // If the system is decimal we will return the number since we have already converted the number to decimal number system.
        if (system === "decimal") {
            return formatNumber(number);
        }

        let intPart = Number(getIntegralPart(number));
        let fracPart = Number(getFractionalPart(number));

        let intPartAns = "";
        while (intPart > 0) {
            let rem = intPart % baseValue;
            rem = NUMBER_SYSTEMS[system]["numbers"][rem];
            intPartAns += rem;

            intPart = Math.floor(intPart / baseValue);
        }

        intPartAns = reverseString(intPartAns);

        fracPart = Number("0." + fracPart);
        let fracPartAns = "";
        while ((fracPartAns.length < 21) && (fracPart > 0)) {
            let val = fracPart * baseValue;
            fracPartAns += getIntegralPart(val);

            fracPart = Number("0." + getFractionalPart(val));
        }

        if (fracPartAns.length === 0) {
            fracPartAns = "0";
        }

        let finalAns = intPartAns + "." + fracPartAns;
        if (formatNumber(finalAns).length === 0) {
            return "0";
        }
        return formatNumber(finalAns);
    }

}
