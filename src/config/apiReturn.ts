export class ApiResponse {
    statusCode: number;
    message: string | undefined;

    constructor(message: string | undefined, statusCode: number) {
        this.statusCode = statusCode;
        this.message = message;
    }
}