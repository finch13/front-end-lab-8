import interfaceModule from './interface-module';
import calculatingModule from './calculating-module';
import css from '../styles/styles.css';

(function () {
    interfaceModule();

    let content = document.querySelector('.content'),
        buttons = document.querySelectorAll('.math_button'),
        result = document.createElement('span');

    result.classList.add('result');

    buttons.forEach(element => {
        element.addEventListener('click', () => {
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].classList.contains('active')) {
                    buttons[i].classList.remove('active');
                }
                if (i === buttons.length - 1) {
                    element.classList.add('active');
                }
            }

            if (isNaN(calculatingModule(element)) || !isFinite(calculatingModule(element))) {
                result.innerHTML = 'Incorrect data';
            } else {
                result.innerHTML = `${calculatingModule(element)}`;
            }
            content.appendChild(result);
        });
    });

}());