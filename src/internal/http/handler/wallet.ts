import { Request, Response } from 'express';
import Services from "../../service/services";
import { ResponseData } from '../response/response';
import ErrorHandler from '../error/error';

class WalletHandler {
    private services: Services;
    private errorHandler: ErrorHandler;

    constructor(services: Services, errorHandler: ErrorHandler) {
        this.services = services;
        this.errorHandler = errorHandler;
    }

    Hello = (req: Request, res: Response): Response => {
        this.errorHandler.SetRes(res);
        const name: string | undefined = req.query.name as string;

        if (!name) {
            return this.errorHandler.BadRequest("Name parameter is required.");
        }

        const msg = this.services.WalletService().Hello(name);

        return this.errorHandler.OK("Hello Success", msg);
    }

    GetBalance = async (req: Request, res: Response): Promise<Response> => {
        this.errorHandler.SetRes(res);

        const walletAddress: string | undefined = req.params.walletAddress;

        try {
            const balance = await this.services.WalletService().GetBalance(walletAddress);

            return this.errorHandler.OK("Balance fetched successfully", balance);
        } catch (error) {
            if (error instanceof ResponseData) {
                return this.errorHandler.Format(error)
            }
            return this.errorHandler.InternalServerError("Unkown Error", error);
        }
    }

    GetAccountInfo = async (req: Request, res: Response): Promise<Response> => {
        this.errorHandler.SetRes(res);

        const walletAddress: string | undefined = req.params.walletAddress;

        try {
            const balance = await this.services.WalletService().GetAccountInfo(walletAddress);

            return this.errorHandler.OK("Account information fetched successfully", balance);
        } catch (error) {
            if (error instanceof ResponseData) {
                return this.errorHandler.Format(error)
            }
            return this.errorHandler.InternalServerError("Unkown Error", error);
        }
    }

    Airdrop = async (req: Request, res: Response): Promise<Response> => {
        this.errorHandler.SetRes(res);

        const { walletAddress, solAmount } = req.body;

        try {
            const tx = await this.services.WalletService().Airdrop(walletAddress, solAmount)

            return this.errorHandler.OK("Balance fetched successfully", tx);
        } catch (error) {
            if (error instanceof ResponseData) {
                return this.errorHandler.Format(error)
            }
            return this.errorHandler.InternalServerError("Unkown Error", error);
        }
    }

    VerifyTransaction = async (req: Request, res: Response): Promise<Response> => {
        this.errorHandler.SetRes(res);

        const { txid, donatorWalletAddress, campaignWalletAddress, recivedSOL } = req.body;

        if (!txid || !donatorWalletAddress || !campaignWalletAddress || recivedSOL === undefined) {
            return this.errorHandler.BadRequest("txid, donatorWalletAddress, campaignWalletAddress, and recivedSOL are required.");
        }

        try {
            const parsedRecivedSOL = parseFloat(recivedSOL);

            if (isNaN(parsedRecivedSOL)) {
                return this.errorHandler.BadRequest("recivedSOL must be a valid number.");
            }

            const isValid = await this.services.WalletService().VerifyTransaction(
                txid,
                donatorWalletAddress,
                campaignWalletAddress,
                recivedSOL
            );

            return this.errorHandler.OK("Transaction verification result", { isValid });
        } catch (error) {
            if (error instanceof ResponseData) {
                return this.errorHandler.Format(error);
            }
            return this.errorHandler.InternalServerError("Unknown Error", error);
        }
    };
}

export default WalletHandler;
