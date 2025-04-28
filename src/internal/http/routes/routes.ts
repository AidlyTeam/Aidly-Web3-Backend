import NFTRoutes from "./nft";
import UserRoutes from "./user";
import WalletRoutes from "./wallet";
import { Express, Request, Response } from 'express';

// This Class For Grouping Routes
class Routes {
    private app: Express;
    private wallet: WalletRoutes;
    private nft: NFTRoutes
    private user: UserRoutes

    constructor(app: Express, walletRoutes: WalletRoutes, nftRoutes: NFTRoutes, userRoutes: UserRoutes) {
        this.app = app;
        this.wallet = walletRoutes;
        this.nft = nftRoutes
        this.user = userRoutes
    }

    init() {
        this.app.get("/", (req: Request, res: Response) => {
            res.send("Welcome to the Aidly Lab API!");
        });

        this.app.use('/wallet', this.wallet.init());
        this.app.use('/nft', this.nft.init())
        this.app.use('/user', this.user.init())
    }
}

export default Routes;
