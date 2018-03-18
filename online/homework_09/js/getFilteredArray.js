'use strict';

function getFilteredArray(arr, predicateFunction) {
    let newArray = [];
    forEach(arr, el => {
        if (predicateFunction(el)) {
            newArray.push(el);
        }
    })
    return newArray;
}