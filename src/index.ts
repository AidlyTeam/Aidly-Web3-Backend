import { LoadConfig } from './internal/config/config';
import { Run } from './internal/app/run';
import { configDotenv } from 'dotenv';

try {
    configDotenv() // ENV

    let config = LoadConfig();

    Run(config);
} catch (error) {
    console.error('Error occurred:', error);
}
