import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/sequelize.js";
import db from "./models/index.js";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";

dotenv.config();
dotenv.config();
const app = express();

app.use(express.json());

// Test API Route
app.get("/", (req, res) => {
    res.send("🚀 Server is running...");
});

// Connect to DB before starting the server
(async () => {
    await connectDB();
})();
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/category", categoryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
