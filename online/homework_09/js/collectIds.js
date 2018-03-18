'use strict';

function collectIds(arr) {
    let newArray = [];

    getFilteredArray(arr, el => {
        if (el.rating > 3) {
            return newArray.push(el.id);
        }
    });

    return newArray;
}