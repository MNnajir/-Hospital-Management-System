class CustomAPIError extends Error {
    constructor(message) {
        super(message);
        //this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
    } 
}


module.exports = CustomAPIError;