import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        dialect: "postgres",
        logging: false, // Disable SQL logging for cleaner console
    }
);

// Function to authenticate & sync database
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connection established successfully.");

        // Sync models automatically in development only
        if (process.env.NODE_ENV === "development") {
            await sequelize.sync({ alter: false }); // change to true only when updating models
            console.log("✅ Models synchronized successfully.");
        }
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error.message);
        process.exit(1); // Exit process if DB connection fails
    }
};

export default sequelize;
