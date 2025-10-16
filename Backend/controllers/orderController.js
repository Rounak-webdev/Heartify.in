import { db } from "../config/db.js";
export const createOrder = async (req, res) => {
    const { items, total_amount } = req.body;
    const userId = req.user?.id;
    try {
        const [orderResult] = await db.query("INSERT INTO orders (user_id, total_amount) VALUES (?, ?)", [userId, total_amount]);
        const orderId = orderResult.insertId;
        for (const item of items) {
            await db.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", [orderId, item.productId, item.quantity, item.price]);
        }
        res.json({ message: "Order placed successfully", orderId });
    }
    catch {
        res.status(500).json({ error: "Database error" });
    }
};
export const getUserOrders = async (req, res) => {
    const userId = req.params.id;
    try {
        const [rows] = await db.query("SELECT * FROM orders WHERE user_id = ?", [userId]);
        res.json(rows);
    }
    catch {
        res.status(500).json({ error: "Database error" });
    }
};
