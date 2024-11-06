import { DataTypes } from 'sequelize';
import { sequelize } from "../config/connection.js"; // Make sure this path is correct

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Optional: Prevent duplicate usernames
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;
