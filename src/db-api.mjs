// create code CRUD Test table. ref create-database.mjs
import sqlite3 from "sqlite3";

export async function selectAllRows(db) {
  const sql = `
        SELECT * FROM Test;
    `;
  const rows = await db.all(sql);
  return rows;
}

export async function selectRowById(db, id) {
  const sql = `
        SELECT * FROM Test WHERE id = ?;
    `;
  const row = await db.get(sql, id);
  return row;
}

export async function insertRow(db, name, email, nickname) {
  const sql = `
        INSERT INTO Test (name, email, nickname) VALUES (?, ?, ?);
    `;
  const result = await db.run(sql, [name, email, nickname]);
  return result;
}

export async function updateRow(db, id, name, email, nickname) {
  const sql = `
        UPDATE Test SET name = ?, email = ?, nickname = ? WHERE id = ?;
    `;
  const result = await db.run(sql, [name, email, nickname, id]);
  return result;
}

export async function deleteRow(db, id) {
  const sql = `
        DELETE FROM Test WHERE id = ?;
  `;
  const result = await db.run(sql, [id]);
  return result;
}
