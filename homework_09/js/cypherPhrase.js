'use strict';

function cypherPhrase(obj, str) {
    let newStr = str.split('');

    return getTransformedArray(newStr, function (elem) {
        let someObj = Object.keys(obj);

        getTransformedArray(someObj, function (el) {
            if (elem === el) {
                elem = obj[el];
            }
        });

        return elem;

    }).join('');
}