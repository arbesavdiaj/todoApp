const database = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = {
  register: async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      const [existingUser] = await database.query(
        "SELECT * FROM User WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        return res
          .status(400)
          .json({ message: "Email address already exists." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const [registerUser] = await database.query(
        "INSERT INTO User (fullName, email, password) VALUES (?, ?, ?)",
        [fullName, email, hashedPassword]
      );
      res
        .status(200)
        .json({ message: "Registration successful:", registerUser });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const [loginUser] = await database.query(
        "SELECT * FROM User WHERE email = ?",
        [email]
      );
      if (loginUser.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const hashedPassword = loginUser[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ userId: loginUser[0].userId }, "secretKey", {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res
        .status(200)
        .json({ message: "Login successful", user: loginUser, token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out" });
  },
};
module.exports = auth;
