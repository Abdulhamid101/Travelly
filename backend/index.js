import express from "express";
import Datastore from "nedb-promises";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());


const dbDir = "./database";
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const users = Datastore.create({
  filename: path.join(dbDir, "Users.db"),
  autoload: true,
  timestampData: true,
});

await users.ensureIndex({ fieldName: "email", unique: false });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});


app.get("/", (_req, res) => {
  res.send("Welcome to Travelly API");
});


app.post("/api/auth/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body || {};
    const errors = {};

    if (!name || !String(name).trim()) errors.name = "Name is required";
    email = String(email || "")
      .toLowerCase()
      .trim();
    if (!EMAIL_RE.test(email)) errors.email = "Valid email required";
    if (!password || String(password).length < 8)
      errors.password = "Password must be at least 8 characters";

    if (Object.keys(errors).length) {
      return res.status(422).json({ errors });
    }

    const exists = await users.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);
    const doc = await users.insert({
      name: String(name).trim(),
      email,
      password: hash,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: publicUser(doc),
    });
  } catch (err) {
    console.error("SIGNUP error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
