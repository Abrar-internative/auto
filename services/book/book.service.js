const pool = require("../../config/db.config");

const getAllBooks = async () => {
  const [results] = await pool.query(
    "SELECT * FROM book"
  );

  return results;
};

const getSingleBook = async (id) => {
  const [result] = await pool.query(
    "SELECT * FROM book WHERE id = ?",
    [id]
  );

  return result[0];
};

const createBook = async (body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `INSERT INTO book (name) VALUES (?)`,
        [name]
    );

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const updateBook = async (id, body) => {
  const { name } = body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await pool.query(
        `UPDATE book SET name = ? WHERE id = ?`,
        [name, id]
    );

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const deleteBook = async (id) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await pool.query(
        `DELETE FROM book WHERE id = ?`,
        [id]
    );

    await conn.commit();

    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
