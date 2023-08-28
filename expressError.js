// // define custom error class
// class ExpressError extends Error {
//     constructor(msg, status) {
//         super();
//         this.msg = msg;
//         this.status = status;
//         console.error(this.stack)
//     }
// }

// // export the class
// module.exports = ExpressError;

class ExpressError extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
        console.error(this.stack);
    }
}

module.exports = ExpressError;