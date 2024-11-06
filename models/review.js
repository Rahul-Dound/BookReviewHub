// models/review.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';  // Import your sequelize instance

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ISBN: {
        type: DataTypes.INTEGER,
        allowNull: false // Ensure this is required in the model too
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Reviews', // Ensure the table name matches your actual table
    timestamps: false // Add this if you don't have timestamps in the table
});

export default Review;
