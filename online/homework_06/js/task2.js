"use strict";

var euroOne = 33.46;
var usdOne = 27.12;

var euro = Number(prompt('Enter the amount of EUROS...', ''));
var usd = Number(prompt('Enter the amount of DOLLARS...', ''));

let euroInUah = euro * euroOne;
let usdInUah = usd * usdOne;
let euroInUsd = euroOne / usdOne;

if (euro >= 0.01 && usd >= 0.01) {
    console.log(`${Math.trunc(euro * 100) / 100} euros are equal ${Math.trunc(euroInUah * 100) / 100} UAH, ${Math.trunc(usd * 100) / 100} dollars are equal ${Math.trunc(usdInUah * 100) / 100} UAH, one euro is equal ${Math.trunc(euroInUsd * 100) / 100} dollars.`);
} else {
    console.log('Incorect data');
}
