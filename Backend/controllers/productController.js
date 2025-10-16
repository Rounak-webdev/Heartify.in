import { db } from "../config/db.js";
export const getProducts = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json(rows);
    }
    catch {
        res.status(500).json({ error: "Database error" });
    }
};
export const addProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        await db.query("INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)", [name, description, price, stock, image_url]);
        res.json({ message: "Product added successfully" });
    }
    catch {
        res.status(500).json({ error: "Database error" });
    }
};
