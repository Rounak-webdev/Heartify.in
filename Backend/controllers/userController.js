import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";


export const signupUser = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth } = req.body;

    // Check if user exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    await db.query(
      "INSERT INTO users (name, email, password, dateOfBirth) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, dateOfBirth]
    );
    const token = generateToken(email, res);
    res.json({ message: "Signup successful!", token, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]);
        if (rows.length === 0){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match){
            return res.status(400).json({ message: "Invalid credentials" });
        }
       const token = generateToken(user.id, user.email);

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
