import { Keypair } from '@solana/web3.js';
import fs from 'fs';
import bs58 from 'bs58';

const ReadKeypair = (walletPath: string, name: string): Keypair => {
    const keypairPath = walletPath + "/" + name;

    const keypairData = fs.readFileSync(keypairPath);

    const secretKeyUint8 = new Uint8Array(JSON.parse(keypairData.toString()));

    const keypair = Keypair.fromSecretKey(secretKeyUint8);

    return keypair;
};


const ToKeypairFromBase64 = (base64Key: string): Keypair => {
    const secretKeyUint8 = new Uint8Array(Buffer.from(base64Key, 'base64'));

    const keypair = Keypair.fromSecretKey(secretKeyUint8);

    return keypair;
}


const ToKeypairFromBase58 = (base58Key: string): Keypair => {
    const secretKeyUint8 = new Uint8Array(bs58.decode(base58Key));

    const keypair = Keypair.fromSecretKey(secretKeyUint8);

    return keypair;
}

export default {
    ReadKeypair,
    ToKeypairFromBase64,
    ToKeypairFromBase58
};
