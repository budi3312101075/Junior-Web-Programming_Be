import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { query } from "../utils/query.js";
import { dateValue, uuid } from "../utils/tools.cjs";

export const register = async (req, res) => {
  const { username, password, confpassword, kelas } = req.body;
  try {
    if (
      username === undefined ||
      password === undefined ||
      confpassword === undefined ||
      kelas === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confpassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    const isUserExist = await query(
      "SELECT username FROM users WHERE username = ?",
      [username]
    );
    if (isUserExist.length > 0) {
      return res.status(400).json({ error: "Username already exist" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await query(
        `INSERT INTO users (uuid, username, password, photo, kelas, is_admin, is_deleted,created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          uuid(),
          username,
          hashedPassword,
          null,
          kelas,
          0,
          0,
          dateValue(),
          dateValue(),
        ]
      );
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === undefined || password === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const cekUser = await query(
      `SELECT username, password FROM users WHERE username = ? AND is_deleted = 0`,
      [username]
    );

    if (cekUser.length === 0) {
      return res.status(400).json({ error: "Username doesn't exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, cekUser[0].password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Password wrong" });
    }

    const user = await query(
      `SELECT uuid, username, kelas, photo, is_admin FROM users WHERE username = ?`,
      [username]
    );

    const payload = {
      uuid: user[0].uuid,
      username: user[0].username,
      kelas: user[0].kelas,
      photo: user[0].photo,
      is_admin: user[0].is_admin,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const options = {
      httpOnly: true,
      maxAge: 3600000 * 1 * 24,
    };
    return res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, data: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token")
      .json({ success: true, msg: "Logout Berhasil!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
