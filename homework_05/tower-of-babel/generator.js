const max = process.argv[2];
let FizzBuzz = function* () {
    let number = 1;
    while (number <= max) {
        let value = number;
        number++;
        if ((value % 3 === 0) && (value % 5 === 0)) {
            value = 'FizzBuzz';
        } else if (value % 3 === 0) {
            value = 'Fizz';
        } else if (value % 5 === 0) {
            value = 'Buzz';
        }
        yield value;
    }
}();
for (var n of FizzBuzz) {
    console.log(n);
}