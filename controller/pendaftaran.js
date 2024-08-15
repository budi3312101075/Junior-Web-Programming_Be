import { query } from "../utils/query.js";
import { uuid } from "../utils/tools.cjs";

export const getPendaftaran = async (req, res) => {
  try {
    const data = await query(
      `SELECT p.uuid, u.username, u.kelas, p.deskripsi,p.status, e.nama AS namaEkskul 
      FROM pendaftaran p INNER join users u on p.id_user = u.uuid 
      INNER join ekskul e on p.id_ekskul = e.uuid`
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const getByIdEkskul = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await query(
      `SELECT p.uuid, u.username, u.kelas, p.deskripsi,p.status, e.nama AS namaEkskul 
      FROM pendaftaran p 
      INNER join users u on p.id_user = u.uuid 
      INNER join ekskul e on p.id_ekskul = e.uuid 
      WHERE e.uuid = ?;`,
      [id]
    );

    const namaEkskul = await query(`SELECT nama FROM ekskul WHERE uuid = ?;`, [
      id,
    ]);
    return res.status(200).json({ nama: namaEkskul[0].nama, data: data });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const addPendaftaran = async (req, res) => {
  const { deskripsi, id_ekskul } = req.body;
  const id_user = req.user.uuid;
  try {
    if (deskripsi === undefined || id_ekskul === undefined) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required" });
    }

    const isPendaftaranExist = await query(
      `SELECT * FROM pendaftaran WHERE id_user = ? AND id_ekskul = ?;`,
      [id_user, id_ekskul]
    );
    if (isPendaftaranExist.length > 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Anda sudah pernah mendaftar" });
    }

    await query(
      `INSERT INTO pendaftaran (uuid, deskripsi, status, id_user, id_ekskul) 
      VALUES (?, ?, ?, ?, ?);`,
      [uuid(), deskripsi, "Diajukan", id_user, id_ekskul]
    );
    return res.status(201).json({ success: true, msg: "Pendaftaran Added!" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const deletePendaftaran = async (req, res) => {
  const { id } = req.params;
  try {
    await query(`DELETE FROM pendaftaran WHERE uuid = ?;`, [id]);
    return res.status(201).json({ success: true, msg: "Pendaftaran Deleted!" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const approvePendaftaran = async (req, res) => {
  const { id } = req.params;
  try {
    const isPendaftaranExist = await query(
      `SELECT * FROM pendaftaran WHERE uuid = ?;`,
      [id]
    );
    if (isPendaftaranExist.length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Pendaftaran Tidak Ditemukan" });
    }

    await query(`UPDATE pendaftaran SET status = 'Diterima' WHERE uuid = ?;`, [
      id,
    ]);
    return res
      .status(201)
      .json({ success: true, msg: "Pendaftaran Approved!" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};

export const disApprovePendaftaran = async (req, res) => {
  const { id } = req.params;
  try {
    const isPendaftaranExist = await query(
      `SELECT * FROM pendaftaran WHERE uuid = ?;`,
      [id]
    );
    if (isPendaftaranExist.length === 0) {
      return res
        .status(400)
        .json({ success: false, msg: "Pendaftaran Tidak Ditemukan" });
    }

    await query(`UPDATE pendaftaran SET status = 'Ditolak' WHERE uuid = ?;`, [
      id,
    ]);
    return res
      .status(201)
      .json({ success: true, msg: "Pendaftaran DisApproved!" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: error.message });
  }
};
