import NFTService from "./nft";
import UserService from "./user";
import WalletService from "./wallet";

class Services {
    private wallet: WalletService;
    private nft: NFTService;
    private user: UserService

    constructor(
        walletService: WalletService,
        nftService: NFTService,
        userService: UserService
    ) {
        this.wallet = walletService
        this.nft = nftService
        this.user = userService
    }

    Services(): Services {
        return this
    }

    WalletService(): WalletService {
        return this.wallet
    }

    NFTService(): NFTService {
        return this.nft
    }

    UserService(): UserService {
        return this.user
    }
}

export default Services