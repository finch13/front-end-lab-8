const waitFewSec = (msec, triggerFail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (triggerFail) {
                reject(false);
                return;
            }

            resolve(true);
        }, msec);
    });
};
const asyncFn = async () => {
    const result = await waitFewSec(1000);
    return result;
};
async function doAsyncMagic() {
    let resultArray = [];
    for (let i = 0; i < 4; i++) {
        try {
            resultArray.push(await asyncFn());
        } catch (error) {
            console.log(error);
        }
    }
    console.log(resultArray);
}
doAsyncMagic();


async function* rangeGen() {
    for (let i = 1; i <= 15; i++) {
        yield i;
    }
}
async function iterateRange() {
    let result = 0;
    try {
        for await (let val of rangeGen()) {
            result += val;
        }
        return result;
    } catch (error) {
        return console.error(error);
    }
}
iterateRange();
