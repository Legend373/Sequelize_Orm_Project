import db from "../models/index.js";

const { Product, ProductImage, Category } = db;

// Create a product
export const createProduct = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { name, description, price, quantity, category_id, images } = req.body;

        const product = await Product.create(
            { name, description, price, quantity, category_id },
            { transaction: t }
        );

        if (images && images.length > 0) {
            const productImages = images.map((url) => ({
                product_id: product.id,
                url,
            }));
            await ProductImage.bulkCreate(productImages, { transaction: t });
        }

        await t.commit(); // ✅ both product + images saved
        res.status(201).json({ product });
    } catch (err) {
        await t.rollback(); // ❌ nothing saved if error happens
        res.status(400).json({ error: err.message });
    }
};


// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: ["images", "category"]
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: ["images", "category"]
        });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        await product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        await product.destroy();
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
