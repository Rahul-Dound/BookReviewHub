// connection.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql', // Change this based on your database
    }
);

// Export SALT_ROUNDS
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10; // Default to 10 if not set

// Test the connection and sync the models
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Sync all defined models to the DB
        await sequelize.sync(); // This creates the tables if they don't exist
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export { sequelize, SALT_ROUNDS }; // Export sequelize and SALT_ROUNDS
