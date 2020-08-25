class ApplicationError implements Error {
    public name:string = 'ApplicationError';
    constructor(public message: string) {
        if (typeof console !== 'undefined') {
            console.error(`ErrorName:${this.name}`);
            console.error(`ErrorMessage:${this.message}`);
        }
    }
    toString() {
        return {
            name: this.name,
            message: this.message
        };
    };
};

class RequestError extends ApplicationError {
    public name: string = "RequestError";
};

class NotFoundError extends ApplicationError {
    public name: string = "NotFoundError";
};

class RentalStatusError extends ApplicationError {
    public name: string = "RentalStatusError";
};

class LoginError extends ApplicationError {
    public name: string = "LoginError";
};

class UnkownError extends ApplicationError {
    public name: string = "UnkownError";
};

export {
    ApplicationError,
    RequestError,
    NotFoundError,
    RentalStatusError,
    LoginError,
    UnkownError
};