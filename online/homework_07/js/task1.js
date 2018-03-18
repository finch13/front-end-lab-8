'use strict';

var floors = Number(prompt('Enter natural number: 0 < N <= 20', '')),
    floor = floors,
    space = '...',
    brick = '[~]';

if (floors <= 0 || floors > 20 || !Number.isInteger(floors) || isNaN(floors)) {
    console.error('Incorrect!');
} else {
    while (floor-- > 0) {
        console.log(Array(floor + 1).join(space) + Array(2 * (floors - floor)).join(brick));
    }
}