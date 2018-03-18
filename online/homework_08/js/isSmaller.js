'use strict';

function isSmaller(a, b) {
    function isBigger(a, b) {
        return a > b;
    }
    if (a === b) {
        return false;
    }
    return !isBigger(a, b);
}