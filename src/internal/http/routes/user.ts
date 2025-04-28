import { Router, Request, Response } from 'express';
import Handler from '../handler/handler';

// This Class For Specifig Routes
class UserRoutes {
    private handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    init(): Router {
        const router = Router();

        router.get('/', (req: Request, res: Response) => {
            res.send("Welcome to the User Endpoint Aidly API!");
        });

        return router;
    }
}

export default UserRoutes;
