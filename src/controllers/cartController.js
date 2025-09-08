import db from "../models/index.js";

const { Cart, Product, User } = db;

// Get user's cart
export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            where: { user_id: req.params.userId },
            include: ["products"]
        });

        if (!cart) return res.status(404).json({ error: "Cart not found" });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add product to cart
export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ where: { user_id: userId } });

        if (!cart) {
            cart = await Cart.create({ user_id: userId });
        }

        await cart.addProduct(productId, { through: { quantity } });

        res.json({ message: "Product added to cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ where: { user_id: userId } });

        if (!cart) return res.status(404).json({ error: "Cart not found" });

        await cart.removeProduct(productId);

        res.json({ message: "Product removed from cart" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ where: { user_id: req.params.userId } });

        if (!cart) return res.status(404).json({ error: "Cart not found" });

        await cart.setProducts([]);

        res.json({ message: "Cart cleared" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
