import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

interface Config {
    [key: string]: any;
}

const LoadConfig = (): Config => {
    const configPath = path.resolve(__dirname, '../../config/config.yaml'); // Dosya yolunu mutlak yapıyoruz

    try {
        if (!fs.existsSync(configPath)) {
            throw new Error(`Config file not found at: ${configPath}`);
        }

        const config: Config = yaml.load(fs.readFileSync(configPath, 'utf8')) as Config;
        return config;
    } catch (e) {
        if (e instanceof Error) {
            console.error(`Error loading config file: ${e.message}`);
        }
        process.exit(1);
    }
};

export { LoadConfig, Config };
