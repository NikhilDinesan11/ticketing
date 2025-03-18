import { CustomError } from "./custom-error"
export class DatabaseConenctionError extends CustomError {
    statusCode = 500
    reason = "Error connecting to database"

    constructor() {
        super("Error connecting to db")

        Object.setPrototypeOf(this, DatabaseConenctionError.prototype)
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ]
    }
}