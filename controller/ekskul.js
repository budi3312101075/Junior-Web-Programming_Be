import { query } from "../utils/query.js";
import { uuid } from "../utils/tools.cjs";

export const getEkskul = async (req, res) => {
  try {
    const data = await query(`SELECT * FROM ekskul WHERE is_deleted = 0;`);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const addEkskul = async (req, res) => {
  const { nama, deskripsi, jadwal } = req.body;
  try {
    if (nama === undefined || deskripsi === undefined || jadwal === undefined) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    const isEkskulExist = await query(
      `SELECT * FROM ekskul WHERE nama = ? AND is_deleted = 0;`,
      [nama]
    );
    if (isEkskulExist.length > 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Ekskul already exist" });
    }

    await query(
      `INSERT INTO ekskul (uuid, nama, deskripsi, jadwal, is_deleted) 
      VALUES (?, ?, ?, ?, ?);`,
      [uuid(), nama, deskripsi, jadwal, 0]
    );
    return res.status(201).json({ success: true, msg: "Ekskul Added!" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const updateEkskul = async (req, res) => {
  const { nama, deskripsi, jadwal } = req.body;
  const { id } = req.params;
  try {
    if (nama === undefined || deskripsi === undefined || jadwal === undefined) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }
    await query(
      `UPDATE ekskul SET nama = ?, deskripsi = ?, jadwal = ? WHERE uuid = ?;`,
      [nama, deskripsi, jadwal, id]
    );
    return res.status(201).json({ success: true, msg: "Ekskul Updated!" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const deleteEkskul = async (req, res) => {
  const { id } = req.params;
  try {
    await query(`UPDATE ekskul SET is_deleted = 1 WHERE uuid = ?;`, [id]);
    return res.status(201).json({ success: true, msg: "Ekskul Deleted!" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};
