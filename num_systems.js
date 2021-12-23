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
        this.number = String(num).toUpperCase();
        this.system = String(sys).toLowerCase();

        if (!isValidInSystem(num, sys)) {
            throw "The given number " + num + " is not valid in " + sys + " system.";
        }

        this.baseValue = NUMBER_SYSTEMS[sys].baseValue;
        this.validNumbers = NUMBER_SYSTEMS[sys].numbers;

        this.binaryRepresentation = this.toSystem("binary");
        this.octalRepresentation = this.toSystem("octal");
        this.decimalRepresentation = this.toSystem("decimal");
        this.hexadecimalRepresentation = this.toSystem("hexadecimal");
        
    }

    toDecimal() {
        let hexRepresentation = {
            "a": 10, "b": 11, "c": 12, "d": 13, "e": 14, "f": 15,
        }

        let currentPower = getIntegralPart(this.number).length - 1;
        let total = 0;

        let num = this.number.replace(".", "").toLowerCase();
        for (let i = 0; i < num.length; i++) {
            let n = num.charAt(i);
            // if the number is a hexadecimal number it may include a, b, c, d, e and f
            if (Object.keys(hexRepresentation).includes(n)) {
                n = hexRepresentation[n];  // Replacing a with 10, b with 11 and so on..
            }

            total += (Number(n) * this.baseValue ** currentPower);
            currentPower--;
        }

        return String(total);
    }

    toSystem(sys) {
        if (!isValidSystem(sys)) {
            return "Invalid System";
        }

        let number = this.toDecimal()

        let system = String(sys).toLowerCase();
        let baseValue = NUMBER_SYSTEMS[system]["baseValue"];

        // If the system is decimal number we will return the number since the number is already a decimal number.
        if (system === "decimal") {
            return number;
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
        return finalAns;
    }

}


class DecimalNumber extends NumberSystem {
    constructor(num) {
        super(num, "decimal");
    }
}


class BinaryNumber extends NumberSystem {
    constructor(num) {
        super(num, "binary");
    }
}


class OctalNumber extends NumberSystem {
    constructor(num) {
        super(num, "octal");
    }
}


class HexadecimalNumber extends NumberSystem {
    constructor(num) {
        super(num, "hexadecimal");
    }
}
