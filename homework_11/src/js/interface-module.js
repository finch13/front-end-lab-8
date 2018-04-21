export default function interfaceModule() {
    let content = document.createElement('div'),
        wrapper = document.createElement('div'),
        header = document.createElement('h1'),
        firstInput = document.createElement('input'),
        secondInput = document.createElement('input'),
        mathButtons = document.createElement('div'),
        resultText = document.createElement('p'),
        mathSigns = ['+', '-', '*', '/', '\u221A', 'pow'];

    wrapper.classList.add('wrapper');
    content.classList.add('content');
    firstInput.classList.add('input_value');
    secondInput.classList.add('input_value');
    mathButtons.classList.add('math');
    resultText.classList.add('result-text');

    firstInput.setAttribute('id', 'first_input');
    firstInput.setAttribute('type', 'number');
    firstInput.setAttribute('placeholder', 'Type number...');
    secondInput.setAttribute('id', 'second_input');
    secondInput.setAttribute('type', 'number');
    secondInput.setAttribute('placeholder', 'Type number...');

    for (let i = 0; i < mathSigns.length; i++) {
        let button = document.createElement('button');
        button.classList.add('math_button');
        mathButtons.appendChild(button);
    }


    for (let i = 0; i < mathButtons.children.length; i++) {
        mathButtons.childNodes[i].innerHTML = mathSigns[i];
    }

    header.innerHTML = 'Calculator';
    resultText.innerHTML = 'Result is: ';

    document.body.insertBefore(wrapper, document.body.firstChild);
    wrapper.appendChild(content);
    content.appendChild(header);
    content.appendChild(firstInput);
    content.appendChild(secondInput);
    content.appendChild(mathButtons);
    content.appendChild(resultText);
}