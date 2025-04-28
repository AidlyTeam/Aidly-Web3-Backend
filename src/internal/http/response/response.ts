export class ResponseData {
    private message: string | undefined;
    private status: number | undefined;
    private data: any;
    private error: string | undefined;

    constructor(message?: string, status?: number, data: any = null, error?: string) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.error = error;
    }

    Status(): number {
        return this.status ?? 666;  // Default failure status
    }

    Data(): any {
        return this.data;
    }

    Error(): string | undefined {
        return this.error;
    }

    static Success(data: any, message: string = 'Operation Successful'): ResponseData {
        return new ResponseData(message, 200, data);
    }

    static Error(errorMessage: string, message: string = 'Operation Failed'): ResponseData {
        return new ResponseData(message, 500, null, errorMessage);
    }
}
