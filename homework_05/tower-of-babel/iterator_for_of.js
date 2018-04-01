const max = process.argv[2];
let FizzBuzz = {
	[Symbol.iterator]() {
		let number = 1;
		return {
			next() {
				if (number > max) return { done: true };
				let value = number;
				if ((value % 3 === 0) && (value % 5 === 0)) {
					value = 'FizzBuzz';
				} else if (value % 3 === 0) {
					value = 'Fizz';
				} else if (value % 5 === 0) {
					value = 'Buzz';
				}
				number++;
				return { done: false, value: value };
			}
		}
	}
}

for (var n of FizzBuzz) {
	console.log(n);
}