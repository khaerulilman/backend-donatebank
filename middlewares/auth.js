const jwt = require("jsonwebtoken");
const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

// Login Function
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Dummy user check (replace with database verification)
  if (email === "admin@example.com" && password === "password123") {
    const user = { email };
    req.session.user = user; // Store user in session

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    return res.status(200).json({ message: "Login successful", user, token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
};

// Logout Function
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    res.clearCookie("connect.sid"); // Clear session cookie
    res.clearCookie("token"); // Clear JWT token cookie
    res.status(200).json({ message: "Logout successful" });
  });
};

// Middleware to Check Authentication
const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { sessionMiddleware, loginUser, logoutUser, verifyToken };
