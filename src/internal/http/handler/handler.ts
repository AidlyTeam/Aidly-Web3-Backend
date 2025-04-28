import Services from "../../service/services";
import WalletHandler from "./wallet";
import NFTHandler from "./nft";
import ErrorHandler from "../error/error";
import UserHandler from "./user";

class Handler {
    private services: Services;
    private errorHandler: ErrorHandler;

    private walletHandler: WalletHandler;
    private nftHandler: NFTHandler;
    private userHandler: UserHandler;

    constructor(services: Services) {
        this.services = services;
        this.errorHandler = new ErrorHandler();

        this.walletHandler = new WalletHandler(
            this.services,
            this.errorHandler,
        );

        this.nftHandler = new NFTHandler(
            this.services,
            this.errorHandler
        );

        this.userHandler = new UserHandler(
            this.services,
            this.errorHandler,
        )
    }

    WalletHandler(): WalletHandler {
        return this.walletHandler;
    }

    NFTHandler(): NFTHandler {
        return this.nftHandler
    }

    UserHandler(): UserHandler {
        return this.userHandler
    }
}

export default Handler;
