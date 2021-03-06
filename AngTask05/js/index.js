var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
};

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
});

function promiseReduce(asyncFunctions, reduce, initialValue) {

    return new Promise(function(resolve) {
        (async function() {
            try {
                let currentValue;
                let count = 0;

                for (let f of asyncFunctions) {
                    currentValue = await f();
                    count++;
                    initialValue = reduce(initialValue, currentValue);
                }
                if(asyncFunctions.length === count) {
                    resolve(initialValue);
                }
            } catch (err) {
                console.error(err);
            }
        })();

    });
};

// Тест кейс
promiseReduce(
    [fn1, fn2],
    function (memo, value) {
        console.log('reduce');
        return memo * value
    },
    1
)
.then(console.log)



