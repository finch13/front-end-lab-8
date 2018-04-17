class Input {
    constructor(placeHolder) {
        this.placeHolder = placeHolder || "Type...";
        this._value = "";
    }

    get value() {
        return this._value;
    }

    setValue(newValue) {
        this._value = newValue;
    }
}

class NumberInput extends Input {
    constructor(placeHolder) {
        super(placeHolder);
        this.type = "number";
        this.valid = false;
    }

    setValue(newValue) {
        this._value = newValue;
        this.validMessage = [];
        this.totalValidationResult = null;

        AddRequiredValidation(this);
        AddMaxLengthValidation(this, 10);
        AddNumberValidation(this);
    }
}

function checkingTotalValid(input) {
    if (input.totalValidationResult >= 3) {
        input.valid = true;
        input.totalValidationResult = 0;
    } else {
        input.valid = false;
    }
}

const AddRequiredValidation = input => {
    if (typeof input.value === "undefined" || input.value === "") {
        input.totalValidationResult += false;
        input.validMessage.push({ "AddRequiredValidation": false });
    } else {
        input.totalValidationResult += true;
        input.validMessage.push({ "AddRequiredValidation": true });
    }

    checkingTotalValid(input);
}
const AddMaxLengthValidation = (input, max) => {
    if (input.value.toString().length > max) {
        input.totalValidationResult += false;
        input.validMessage.push({ "AddMaxLengthValidation": false });
    } else {
        input.totalValidationResult += true;
        input.validMessage.push({ "AddMaxLengthValidation": true });
    }

    checkingTotalValid(input);
}
const AddNumberValidation = input => {
    if (typeof input.value !== "number") {
        input.totalValidationResult += false;
        input.validMessage.push({ "AddNumberValidation": false });
    } else {
        input.totalValidationResult += true;
        input.validMessage.push({ "AddNumberValidation": true });
    }

    checkingTotalValid(input);
}

let numberInput1 = new NumberInput("Type numbers...");
let numberInput2 = new NumberInput("Type numbers...");
let numberInput3 = new NumberInput("Type numbers...");

numberInput1.setValue("12");
console.log(numberInput1.valid);
console.log(numberInput1.validMessage);

numberInput2.setValue(1234567891011);
console.log(numberInput2.valid);
console.log(numberInput2.validMessage);

numberInput3.setValue(345);
console.log(numberInput3.valid);
console.log(numberInput3.validMessage);