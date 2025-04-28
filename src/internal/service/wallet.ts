import { Connection, PublicKey } from "@solana/web3.js";
import { ResponseData } from "../http/response/response";

class WalletService {
    private connection;
    constructor(conn: Connection) {
        this.connection = conn
    }

    Hello(name?: string): string | undefined {
        if (!name) {
            return;
        }

        return `Hello ${name}`;
    }

    async VerifySignature(publicKey: string, message: string, signature: string) {
        const ed25519 = await import('@noble/ed25519');
        try {
            if (!publicKey || !message || !signature) {
                throw new ResponseData("Publickey, Message and signature required", 400);
            }
            const pubKeyUint8 = new PublicKey(publicKey).toBytes();

            const signatureUint8 = Uint8Array.from(Buffer.from(signature, 'base64'));

            const messageUint8 = new TextEncoder().encode(message);

            // Verify Signature with Ed25519
            const isValid = await ed25519.verifyAsync(signatureUint8, messageUint8, pubKeyUint8);

            return isValid
        } catch (error) {
            throw new ResponseData("An error occurred while checking the signature.", 500);
        }
    }

    async GetBalance(walletAddress: string) {
        try {
            if (!walletAddress) {
                throw new ResponseData("Wallet address parameter is required.", 404)
            }

            const publicKey = new PublicKey(walletAddress);

            const balance = await this.connection.getBalance(publicKey);
            const balanceInSOL = balance / 1e9;

            return balanceInSOL;
        } catch (error) {
            throw new ResponseData("An error occurred while retrieving the balance.", 500);
        }
    }

    async GetAccountInfo(walletAddress: string) {
        try {
            if (!walletAddress) {
                throw new ResponseData("Wallet address parameter is required.", 404)
            }

            const publicKey = new PublicKey(walletAddress);
            const accountInfo = await this.connection.getAccountInfo(publicKey);

            return accountInfo;
        } catch (error) {
            throw new ResponseData("An error occurred while retrieving the account info.", 500);
        }
    }

    async Airdrop(walletAddress: string, solAmount: number) {
        try {
            if (!walletAddress) {
                throw new ResponseData("Wallet address parameter is required.", 404)
            }
            if (!solAmount) {
                solAmount = 1
            }

            const publicKey = new PublicKey(walletAddress)

            const lamports = solAmount * 1e9;
            const tx = await this.connection.requestAirdrop(publicKey, lamports);

            return tx

        } catch (error) {
            throw new ResponseData("An error occurred while performing the airdrop.", 500)
        }
    }

}

export default WalletService;
