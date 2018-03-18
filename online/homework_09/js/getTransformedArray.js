'use strict';

function getTransformedArray(arr, someFunction) {
    let newArray = [];
    forEach(arr, el => {
        newArray.push(someFunction(el));
    });
    return newArray;
}