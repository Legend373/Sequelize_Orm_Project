import db from "../models/index.js";
import JWTService from "../utils/jwt.js";

const { User, Address, Cart, Order } = db;

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res.status(409).json({ error: "Email already registered" });

        // Create user
        const user = await User.create({ first_name, last_name, phone_number, email, password });

        // Get user data without password
        const { password: _, ...userData } = user.get({ plain: true });

        // Generate tokens separately
        const accessToken = JWTService.generateToken({ id: user.id, role: user.role }, "access");
        const refreshToken = JWTService.generateToken({ id: user.id, role: user.role }, "refresh");

        return res.status(201).json({ user: userData, tokens: { accessToken, refreshToken } });
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(400).json({ error: err.message });
    }
};
export const createAdmin = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email, password } = req.body;

        // Validate required fields
        if (!first_name || !last_name || !phone_number || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if admin email already exists
        const existingAdmin = await User.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // Create admin user
        let admin = await User.create({
            first_name,
            last_name,
            phone_number,
            email,
            password, // will be hashed automatically via beforeCreate hook
            role: "admin",
        });
        // Force reload from DB
        admin = await User.findByPk(admin.id);

        // Exclude password from response
        const { password: _, ...adminData } = admin.get({ plain: true });

        // Generate JWT tokens
        const accessToken = JWTService.generateToken({ id: admin.id, role: admin.role }, "access");
        const refreshToken = JWTService.generateToken({ id: admin.id, role: admin.role }, "refresh");

        return res.status(201).json({ user: adminData, tokens: { accessToken, refreshToken } });
    } catch (err) {
        console.error("Error creating admin:", err);
        return res.status(400).json({ error: err.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        const isValid = await user.validatePassword(password);
        if (!isValid) return res.status(401).json({ error: "Invalid email or password" });


        // Get user data without password
        const { password: _, ...userData } = user.get({ plain: true });

        // Generate tokens separately
        const accessToken = JWTService.generateToken({ id: user.id, role: "user" }, "access");
        const refreshToken = JWTService.generateToken({ id: user.id, role: "user" }, "refresh");

        return res.status(200).json({ user: userData, tokens: { accessToken, refreshToken } });
    } catch (err) {
        console.error("Error logging in:", err);
        return res.status(500).json({ error: err.message });
    }
};
// Refresh access & refresh tokens
export const refreshToken = async (req, res) => {
    try {
        // Assuming the client sends refresh token in header: Authorization: Bearer <token>
        const authHeader = req.headers["authorization"] || req.headers["x-refresh-token"];
        if (!authHeader) return res.status(401).json({ error: "Refresh token required" });

        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        // Use JWTService to refresh tokens
        const newTokens = JWTService.refreshTokens(token);
        if (!newTokens) return res.status(401).json({ error: "Invalid or expired refresh token" });

        return res.status(200).json(newTokens);
    } catch (err) {
        console.error("Error refreshing tokens:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: ["addresses", "orders", "cart"]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: ["addresses", "orders", "cart"]
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        await user.update(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
