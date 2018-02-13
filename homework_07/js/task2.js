'use strict';

var mess = confirm('Do you want to play a game?');

if (mess) {
    var minNum = 0;
    var maxNum = 5;
    var totalPrize = 0;
    var currentPrize;
    var possiblePrize;
    var maxPrize = 10;

    bigGame:
    for (var i = 0; i < Infinity; i++) {
        var attempt = 3;
        var randomNumber = minNum - 0.5 + Math.random() * (maxNum - minNum + 1);
        randomNumber = Math.round(randomNumber);
        possiblePrize = maxPrize;

        middleGame:
        for (var j = 0; j < 3; j++) {
            var userNumber = prompt(`Enter a number from ${minNum} to ${maxNum}
Attempts left: ${attempt}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${possiblePrize}$`, '');
            if (userNumber == randomNumber && userNumber.trim() !== '' && !userNumber.includes('.')) {
                totalPrize += possiblePrize;
                if (confirm('Do you want to continue a game?')) {
                    maxPrize *= 3;
                    maxNum *= 2;
                    continue bigGame;
                } else {
                    console.log(`Thank you for a game. Your prize is: ${totalPrize}$`);
                    if (confirm('Do you want to play again?')) {
                        maxNum = 5;
                        totalPrize = 0;
                        possiblePrize;
                        maxPrize = 10;
                        continue bigGame;
                    } else {
                        break bigGame;
                    }
                }
            } else if (j == 2) {
                console.log(`Thank you for a game. Your prize is: ${totalPrize}$`);
                if (confirm('Do you want to play again?')) {
                    maxNum = 5;
                    totalPrize = 0;
                    possiblePrize;
                    maxPrize = 10;
                    continue bigGame;
                } else {
                    break bigGame;
                }
            } else {
                currentPrize = Math.floor(possiblePrize / 2);
                possiblePrize = currentPrize;
                attempt--;
                continue middleGame;
            }
        }
    }
} else {
    console.log('You did not become a millionaire');
}