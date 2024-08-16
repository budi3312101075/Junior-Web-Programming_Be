import { query } from "../utils/query.js";

export const getUsers = async (req, res) => {
  try {
    const data = await query(
      `SELECT uuid, username, kelas, 
    CASE 
        WHEN is_admin = 1 THEN 'Admin'
        WHEN is_admin = 0 THEN 'Siswa'
    END AS role FROM users WHERE is_deleted = 0 ORDER BY 
    CASE 
        WHEN is_admin = 1 THEN 0
        WHEN is_admin = 0 THEN 1
    END ;`
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const ubahRole = async (req, res) => {
  const { id } = req.params;
  try {
    const cekRole = await query(`SELECT is_admin FROM users WHERE uuid = ?;`, [
      id,
    ]);

    if (cekRole[0].is_admin == 1) {
      await query(`UPDATE users SET is_admin = ? WHERE uuid = ?;`, [0, id]);
      return res
        .status(201)
        .json({ success: true, msg: "Role Updated Siswa!" });
    } else if (cekRole[0].is_admin == 0) {
      await query(`UPDATE users SET is_admin = ? WHERE uuid = ?;`, [1, id]);
      return res
        .status(201)
        .json({ success: true, msg: "Role Updated Admin!" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await query(`UPDATE users SET is_deleted = 1 WHERE uuid = ?;`, [id]);
    return res.status(201).json({ success: true, msg: "User Deleted!" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};
