import { Router, Request, Response } from 'express';
import  Handler from '../handler/handler'; 

// This Class For Specifig Routes
class WalletRoutes {
    private handler: Handler;

    constructor(handler: Handler) {
        this.handler = handler;
    }

    init(): Router {
        const router = Router();

        router.get('/', (req: Request, res: Response) => {
            this.handler.WalletHandler().Hello(req, res);
        });

        router.get('/balance/:walletAddress', (req: Request, res: Response) => {
            this.handler.WalletHandler().GetBalance(req, res)
        })

        router.get('/info/:walletAddress', (req: Request, res: Response) => {
            this.handler.WalletHandler().GetAccountInfo(req, res)
        })

        router.post('/airdrop', (req: Request, res: Response) => {
            this.handler.WalletHandler().Airdrop(req,res)
        })

        return router;
    }
}

export default WalletRoutes;
