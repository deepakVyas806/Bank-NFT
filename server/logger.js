import winston from 'winston';
import 'winston-mongodb';  // To add MongoDB as a transport
import { Log } from './model/log.models.js';

// Create a Winston logger
const logger = winston.createLogger({
    level: 'info',  // Log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Log format in JSON
    ),
    transports: [
        // Log to the console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),  // Colorize output for easier reading
                winston.format.simple()     // Simple text output
            )
        }),
        // Log to the MongoDB database
        new winston.transports.MongoDB({
            db: process.env.MONGO_URL,  // Your MongoDB connection string
            collection: 'logs',         // Collection name
            level: 'info',              // Log only info and above
            options: { useUnifiedTopology: true },  // Avoid deprecation warnings
            format: winston.format.json()           // Format logs in JSON
        })
    ]
});

export { logger, Log };
