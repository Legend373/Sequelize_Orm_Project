import db from "../models/index.js";

const { Category } = db;

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if category already exists (optional)
        const existing = await Category.findOne({ where: { name } });
        if (existing) {
            return res.status(400).json({ error: "Category already exists" });
        }

        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        category.name = name ?? category.name;
        category.description = description ?? category.description;

        await category.save();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
