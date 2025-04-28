import { ResponseData } from "../response/response";
import { Response } from 'express';

class ErrorHandler {
    private res?: Response;

    SetRes(res: Response): void {
        this.res = res;
    }

    OK(message: string, data: any = null): Response {
        if (!this.res) {
            throw new Error('Response object is not initialized.');
        }
        const response = new ResponseData(message, 200, data);
        return this.res.status(200).json(response);
    }

    BadRequest(message: string, error?: string): Response {
        if (!this.res) {
            throw new Error('Response object is not initialized.');
        }
        const response = new ResponseData(message, 400, null, error);
        return this.res.status(400).json(response);
    }

    InternalServerError(message: string, error: any): Response {
        if (!this.res) {
            throw new Error('Response object is not initialized.');
        }
        const response = new ResponseData(message, 500, null, error);
        return this.res.status(500).json(response);
    }

    Format(data: ResponseData): Response{
        if (!this.res) {
            throw new Error('Response object is not initialized.');
        }
        return this.res.status(data.Status()).json(data);
    }
}

export default ErrorHandler;
