import db from "../models/index.js";

const { Order, OrderItem, Product, User } = db;

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const order = await Order.create(
            {
                ...req.body,
                order_items: req.body.order_items
            },
            {
                include: ["order_items"]
            }
        );
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                "order_items",
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "first_name", "last_name"]
                }
            ]
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: ["order_items", "user"]
        });
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update order status
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });

        await order.update(req.body);
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });

        await order.destroy();
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
