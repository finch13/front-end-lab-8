var inputs = process.argv.slice(2);
var result = inputs.map(e => e[0].toUpperCase())
    .reduce((a, b) => {
        return a + b;
    });
console.log(result);