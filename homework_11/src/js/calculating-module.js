export default function calculatingModule(element) {
    let firstInput = document.getElementById('first_input'),
        secondInput = document.getElementById('second_input'),
        buttons = document.querySelectorAll('.math_button');

    let value1 = Number(firstInput.value),
        value2 = Number(secondInput.value),
        result = 0;

    secondInput.disabled = false;
    switch (element.textContent) {
        case '+':
            result = value1 + value2;
            break;
        case '-':
            result = value1 - value2;
            break;
        case '*':
            result = value1 * value2;
            break;
        case '/':
            result = value1 / value2;
            break;
        case '\u221A':
            secondInput.disabled = true;
            result = Math.sqrt(value1);
            break;
        case 'pow':
            result = Math.pow(value1, value2);
            break;
        default:
            result = 'Incorrect data';
    }

    return Number(result.toFixed(10));
}