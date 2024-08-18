import jwt from "jsonwebtoken";
import { query } from "../utils/query.js";

export const privateRoutes = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "Anda tidak punya Akses!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userDetail = await query(
      `SELECT uuid, username, kelas, photo, is_admin FROM users WHERE uuid = ?;`,
      [decoded.uuid]
    );
    req.user = userDetail[0];
    next();
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
