import HTTP_STATUS from 'http-status-codes';

export interface IErrorResponse {
    message: String
    statusCode: number
    status: String
    serializeErrors(): IError
}

export interface IError {
    message: String
    statusCode: number
    status: string
}

export abstract class CustomError extends Error {
    abstract statusCode: number
    abstract status: string

    constructor(message: string) {
        super(message)
    }

    serializeErrors(): IError {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status
        }
    }
}

export class NotAuthorizedError extends CustomError {
    statusCode = HTTP_STATUS.UNAUTHORIZED
    status = 'error'

    constructor(message: string) {
        super(message)
    }
}

export class NotPermissionError extends CustomError {
    statusCode = HTTP_STATUS.FORBIDDEN
    status = 'error'

    constructor(message: string) {
        super(message)
    }
}

export class BadRequestError extends CustomError {
    statusCode = HTTP_STATUS.BAD_REQUEST
    status = 'error'

    constructor(message: string) {
        super(message)
    }
}

export class NotFoundError extends CustomError {
    statusCode = HTTP_STATUS.NOT_FOUND;
    status = 'error'

    constructor(message: string) {
        super(message)
    }
}

export class ServerError extends CustomError {
    statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE
    status = 'error'

    constructor(message: string) {
        super(message);
    }
}

export class JoiRequestValidationError extends CustomError {
    statusCode = HTTP_STATUS.BAD_REQUEST
    status = 'error'

    constructor(message: string) {
        super(message);
    }
}
