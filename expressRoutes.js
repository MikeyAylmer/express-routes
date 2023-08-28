// import express to file.
const express = require('express');

// import ExpressError.
const ExpressError = require('./expressError')

// now set the app variable to the express()
const app = express();

// define route that takes the passed in param numbers and finds the mean.
app.get('/mean/:nums', function (req, res, next) {
    // check to make sure numbers are passed in.
    if (!req.params.nums) {
        throw new ExpressError('Must pass a query of nums with comma-separated', 400)
    }

    // get rid of the comma and map the numbers out seperate so they arent one number.
    const numbersArray = req.params.nums.split(',').map(Number)

    if (numbersArray.some(isNaN)) {
        // check for non-numeric string.
        if (numbersArray.some(value => typeof value != "number")) {
            throw new ExpressError("Numbers are required", 400)
        }
    }

    const sum = numbersArray.reduce((acc, currVal) => acc + currVal, 0)

    const mean = sum / numbersArray.length;
    return res.send(`
    response: {
    operation: "mean",
    value: ${mean} }`)
})

// write route for median.
app.get('/median/:nums', function (req, res, next) {
    try {
        const numsParam = req.params.nums;
        const numericArray = numsParam.split(',').map(Number);

        if (numericArray.some(isNaN)) {
            throw new ExpressError("Please pass in nums separated by commas", 404);
        }

        numericArray.sort((a, b) => a - b);

        const length = numericArray.length;
        let median;

        if (length % 2 === 0) {
            const midIndex1 = length / 2 - 1;
            const midIndex2 = length / 2;
            median = (numericArray[midIndex1] + numericArray[midIndex2]) / 2;
        } else {
            const midIndex = Math.floor(length / 2);
            median = numericArray[midIndex];
        }

        res.send(`response: {
            operation: "median",
            value: ${median}
          } `);
    } catch (e) {
        next(e);
    }
});

// route to find the mode.
app.get('/mode/:nums', function (req, res, next) {
    try {
        const numsParam = req.params.nums;
        const numericArray = numsParam.split(',').map(Number);

        if (numericArray.some(isNaN)) {
            throw new ExpressError("Please pass in nums separated by commas", 404);
        }

        const counts = {}; // Object to store value frequencies

        numericArray.forEach(num => {
            if (counts[num]) {
                counts[num]++;
            } else {
                counts[num] = 1;
            }
        });

        let mode;
        let maxCount = 0;

        for (const num in counts) {
            if (counts[num] > maxCount) {
                maxCount = counts[num];
                mode = num;
            }
        }

        return res.send(`Mode: ${mode}`);
    } catch (e) {
        next(e);
    }
});

app.use((error, req, res, next) => {
    // Access the error message using error.msg
    // Access the error status using error.status
    res.status(error.status).send(error.msg);
});


// set localhost port.
app.listen(3000, () => {
    console.log("App on port 3000");
})