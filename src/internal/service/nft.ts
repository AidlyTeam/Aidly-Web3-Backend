import { irysStorage, keypairIdentity, Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { ResponseData } from "../http/response/response";
import hasher from "../../pkg/hasher/hasher";

class NFTService {
    private connection: Connection;
    private network: string;
    private keypairPath: string;
    private keypairName: string;

    constructor(conn: Connection, network: string, keypairPath: string, keypairName: string) {
        this.connection = conn
        this.network = network
        this.keypairPath = keypairPath
        this.keypairName = keypairName
    }

    async MintNFT(name: string, symbol: string, uri: string, sellerFeeBasisPoints: number = 500) {
        try {
            const adminKeypair = hasher.ReadKeypair(this.keypairPath, this.keypairName);

            if (!uri) {
                throw new ResponseData("URI required", 400);
            }

            const metaplex = Metaplex.make(this.connection)
                .use(keypairIdentity(adminKeypair))
                .use(irysStorage({
                    address: uri,
                    providerUrl: this.network, // Solana devnet URL
                    timeout: 60000,
                }));

            const { nft } = await metaplex.nfts().create({
                name,
                symbol,
                uri,
                sellerFeeBasisPoints: sellerFeeBasisPoints,
            });


            return nft;
        } catch (error) {
            console.log(error, "error");
            throw new Error("An unexpected error occurred while minting the NFT.");
        }
    }

    async TransferNFT(nftAddress: string, recipientPublicKeyStr: string) {
        try {
            // 1. Sender Wallet 
            const senderKeypair = hasher.ReadKeypair(this.keypairPath, this.keypairName);

            // 2. Recipient Wallet (public key)
            const recipientPublicKey = new PublicKey(recipientPublicKeyStr);

            // 3. NFT Transfer
            const transaction = new Transaction();

            // Initialize Metaplex
            const metaplex = Metaplex.make(this.connection)
                .use(keypairIdentity(senderKeypair));

            // Get NFT metadata and token info
            const nftMetadata = await metaplex.nfts().findByMint({
                mintAddress: new PublicKey(nftAddress)
            });

            // Prepare TransferNftInput parameters
            const transferInput = {
                nftOrSft: {
                    address: new PublicKey(nftAddress),  // The NFT address (mint address)
                    tokenStandard: nftMetadata.tokenStandard,  // The token standard (could be NFT or SFT)
                },
                authority: senderKeypair,  // Sender's keypair as the authority to transfer the NFT
                fromOwner: senderKeypair.publicKey,  // Sender's public key (from which the NFT will be transferred)
                toOwner: recipientPublicKey,  // Recipient's public key
            };

            // Create NFT transfer transaction (wait for it to complete)
            const transferOutput = await metaplex.nfts().transfer(transferInput);

            // Get the transaction signature and response from the transfer
            const signature = transferOutput.response.signature;

            // 4. Send and sign the transaction
            const txSignature = await this.connection.sendTransaction(transaction, [senderKeypair]);

            // 5. Confirm the transaction
            await this.connection.confirmTransaction(txSignature);

            return signature;
        } catch (error) {
            console.error("Error during NFT transfer:", error);
            throw new Error("NFT transfer failed");
        }
    }

}

export default NFTService