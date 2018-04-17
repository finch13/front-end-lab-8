class Input {
    constructor(placeHolder) {
        this.placeHolder = placeHolder || "Type...";
        this._value = "";
    }

    getValue() {
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
    }
}

let numberInput = new NumberInput("Type numbers...");
numberInput.validMessage = [];
numberInput.totalValidationResult = null;
numberInput.valid = false;

//  Then you can create add validation decorators and add functionality to numberInput
//  AddRequiredValidation Decorator that add required validation
//  AddMaxLengthValidation Decorator that add max length validation
//  AddNumberValidation Decorator for only number values validation

const AddRequiredValidation = input => {
    if (typeof input.getValue() === 'undefined' || input.getValue() === '') {
        input.valid = false;
    } else {
        input.valid = true;
    }
    input.totalValidationResult += input.valid;
    // input.validMessage.push(`AddRequiredValidation: ${input.valid ? 'true, did pass' : "false, didn't pass"}`);
    input.validMessage.push({ 'AddRequiredValidation': input.valid });
}
const AddMaxLengthValidation = input => {
    if (input.getValue().toString().length > 10) {
        input.valid = false;
    } else {
        input.valid = true;
    }
    input.totalValidationResult += input.valid;
    // input.validMessage.push(`AddMaxLengthValidation: ${input.valid ? 'true, did pass' : "false, didn't pass"}`);
    input.validMessage.push({ 'AddMaxLengthValidation': input.valid });
}
const AddNumberValidation = input => {
    if (typeof input.getValue() !== 'number') {
        input.valid = false;
    } else {
        input.valid = true;
    }
    input.totalValidationResult += input.valid;
    // input.validMessage.push(`AddNumberValidation: ${input.valid ? 'true, validation did pass' : "false, validation didn't pass"}`);
    input.validMessage.push({ 'AddNumberValidation': input.valid });
}

numberInput.setValue = newValue => {
    numberInput._value = newValue;
    numberInput.validMessage = [];

    AddRequiredValidation(numberInput);
    AddMaxLengthValidation(numberInput);
    AddNumberValidation(numberInput);

    if (numberInput.totalValidationResult >= 3) {
        numberInput.valid = true;
    } else {
        numberInput.valid = false;
    }
    numberInput.totalValidationResult = 0;
}
// The desired behaviour would be
// console.log(numberInput.valid) ---> false, because of required validator
// numberInput.setValue("1");
// console.log(numberInput.valid) ---> false, because of number validator
// numberInput.setValue(1);
// console.log(numberInput.valid) ---> true, all validators pass
// numberInput.setValue(1111111111111111111111111111);
// console.log(numberInput.valid) ---> false, because of max length validator

// Notice after applying some validator to an object, it gets additional "valid" property;



