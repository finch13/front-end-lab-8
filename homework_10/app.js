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
        this.validMessage = [];
        this.totalValidationResult = null;
        this.valid = false;
    }

    setValue(newValue) {
        this._value = newValue;
        this.validMessage = [];

        AddRequiredValidation(this);
        AddMaxLengthValidation(this, 10);
        AddNumberValidation(this);

        if (this.totalValidationResult >= 3) {
            this.valid = true;
        } else {
            this.valid = false;
        }
        this.totalValidationResult = 0;
    }
}

const AddRequiredValidation = input => {
    if (typeof input.value === "undefined" || input.value === "") {
        input.valid = false;
    } else {
        input.valid = true;
    }
    input.totalValidationResult += input.valid;
    input.validMessage.push({ "AddRequiredValidation": input.valid });
}
const AddMaxLengthValidation = (input, max) => {
    if (input.value.toString().length > max) {
        input.valid = false;
    } else {
        input.valid = true;
    }
    input.totalValidationResult += input.valid;
    input.validMessage.push({ "AddMaxLengthValidation": input.valid });
}
const AddNumberValidation = input => {
    if (typeof input.value !== "number") {
        input.valid = false;
    } else {
        input.valid = true;
    }
    input.totalValidationResult += input.valid;
    input.validMessage.push({ "AddNumberValidation": input.valid });
}

let numberInput1 = new NumberInput("Type numbers...");
let numberInput2 = new NumberInput("Type numbers...");
let numberInput3 = new NumberInput("Type numbers...");
numberInput1.setValue("12");
numberInput2.setValue(1234567891011);
numberInput3.setValue(345);

console.log(numberInput1.valid);
console.log(numberInput1.validMessage);
console.log(numberInput2.valid);
console.log(numberInput2.validMessage);
console.log(numberInput3.valid);
console.log(numberInput3.validMessage);



