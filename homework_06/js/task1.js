"use strict";

var a = Number(prompt('Enter the length of the triangle side "a"', ''));
var b = Number(prompt('Enter the length of the triangle side "b"', ''));
var c = Number(prompt('Enter the length of the triangle side "c"', ''));

/* half-perimeter of a triangle */
var p = (a + b + c) / 2;

var S = Math.sqrt(p * (p - a) * (p - b) * (p - c));
console.log(S);

if (isNaN(S) || S.toFixed(2) == 0 || a <= 0 || b <= 0 || c <= 0) {
    console.log('Incorect data');
} else if (a * a == b * b + c * c || b * b == a * a + c * c || c * c == a * a + b * b) {
    console.log('Type of triangle is right triangle and square is ' + (Math.round(S * 100)) / 100);
} else if (a == b && a == c && b == c) {
    console.log('Type of triangle is equilateral triangle and square is ' + (Math.round(S * 100)) / 100);
} else if (a == b || a == c || b == c) {
    console.log('Type of triangle is isosceles triangle and square is ' + (Math.round(S * 100)) / 100);
} else if (a != b && a != c && b != c) {
    console.log('Type of triangle is scalene triangle and square is ' + (Math.round(S * 100)) / 100);
}
