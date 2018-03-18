'use strict';

function forEach(arr, someFunction) {
    for (let i = 0; i < arr.length; i++) {
        someFunction(arr[i]);
    }
}