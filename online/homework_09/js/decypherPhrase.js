'use strict';

function inverObj(obj) {
    var newObj = {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newObj[obj[prop]] = prop;
        }
    }
    return newObj;
};

function decypherPhrase(obj, str) {
    let new_obj = inverObj(obj);
    let newStr = str.split('');

    return getTransformedArray(newStr, function (elem) {
        let someObj = Object.keys(new_obj);

        getTransformedArray(someObj, function (el) {
            if (elem === el) {
                elem = new_obj[el];
            }
        });

        return elem;

    }).join('');
}
