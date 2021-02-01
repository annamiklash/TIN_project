class HttpException extends Error {
    constructor(status, message, data) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

module.exports = HttpException;
