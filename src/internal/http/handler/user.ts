// src/http/handler/user.ts
import Services from "../../service/services";
import ErrorHandler from "../error/error";
import { Request, Response } from 'express';
import { ResponseData } from "../response/response";

class UserHandler {
    private services: Services;
    private errorHandler: ErrorHandler;

    constructor(services: Services, errorHandler: ErrorHandler) {
        this.services = services;
        this.errorHandler = errorHandler;
    }
}

export default UserHandler;
