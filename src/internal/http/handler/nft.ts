import Services from "../../service/services";
import ErrorHandler from "../error/error";
import { Request, Response } from 'express';
import { ResponseData } from "../response/response";

class NFTHandler {
    private services: Services;
    private errorHandler: ErrorHandler;

    constructor(services: Services, errorHandler: ErrorHandler) {
        this.services = services;
        this.errorHandler = errorHandler;
    }

    MintNFT = async (req: Request, res: Response): Promise<Response> => {
        this.errorHandler.SetRes(res);

        const { publicKey, name, symbol, uri, sellerFee } = req.body;

        try {
            const nftMintResult = await this.services.NFTService().MintNFT(
                name,
                symbol,
                uri,
                sellerFee
            );

            const transferNFT = await this.services.NFTService().TransferNFT(
                nftMintResult.address.toString(),
                publicKey.toString()
            )

            return this.errorHandler.OK("NFT minted successfully", { nftMintResult, transferNFT });
        } catch (error) {
            if (error instanceof ResponseData) {
                return this.errorHandler.Format(error);
            }
            return this.errorHandler.InternalServerError("Unknown Error", error);
        }
    };
}

export default NFTHandler