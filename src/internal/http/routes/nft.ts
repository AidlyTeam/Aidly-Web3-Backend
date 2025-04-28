import { Router, Request, Response } from 'express';
import Handler from '../handler/handler';

// This Class For Specific Routes
class NFTRoutes {
    private handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    init(): Router {
        const router = Router();

        // Normal Mint Endpoint
        router.post('/mint', (req: Request, res: Response) => {
            this.handler.NFTHandler().MintNFT(req, res);
        });

        return router;
    }
}

export default NFTRoutes;
