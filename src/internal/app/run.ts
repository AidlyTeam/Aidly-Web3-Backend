import express, { Request, Response } from 'express';
import { Config } from '../config/config';
import Services from '../service/services';
import Handler from '../http/handler/handler';
import SolonaRoutes from '../http/routes/wallet';
import Routes from '../http/routes/routes';
import NFTService from '../service/nft';
import { Connection } from '@solana/web3.js';
import WalletService from '../service/wallet';
import NFTRoutes from '../http/routes/nft';
import UserService from '../service/user';
import UserRoutes from '../http/routes/user';

// Developed by Çetin Boran Mesüm

export const Run = (config: Config): void => {
    console.log("Developed by Çetin Boran Mesüm")

    const cors = require('cors')
    const app = express();
    app.use(express.json());
    app.use(cors())

    // Constants
    const network = config.solana.network.devnet

    // Solana Connection
    const connection = new Connection(network)

    // Service Implementation
    const walletService = new WalletService(connection)
    const nftService = new NFTService(connection, network, config.solana.keypairPath, config.solana.keypairName)
    const userService = new UserService()
    const services = new Services(
        walletService,
        nftService,
        userService
    )

    // Handler Implementation
    const handler = new Handler(services)

    // Creation of Routes
    const solonaRoutes = new SolonaRoutes(handler)
    const nftRoutes = new NFTRoutes(handler)
    const userRoutes = new UserRoutes(handler)
    const routes = new Routes(
        app,
        solonaRoutes,
        nftRoutes,
        userRoutes,
    )

    // Implementation of Routers
    routes.init()

    // Implement Cors Policy
    app.use((req: Request, res: Response, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    // Start Server
    const port = config.http.port
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
