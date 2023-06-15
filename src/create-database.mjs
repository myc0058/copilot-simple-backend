// test.sqlite3 Test 테이블을 만들고 데이터를 넣는다.

import sqlite3 from "sqlite3";
import { faker } from "@faker-js/faker";

async function createTable() {
  const db = new sqlite3.Database("test.sqlite3");
  const sql = `
        CREATE TABLE IF NOT EXISTS Test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        nickname TEXT NOT NULL UNIQUE
        );
    `;
  await db.run(sql);
  db.close();
}

// insert random 10 rows with faker
async function insertRows() {
  const db = new sqlite3.Database("test.sqlite3");
  const sql = `
            INSERT INTO Test (name, email, nickname) VALUES (?, ?, ?);
        `;

  // begin transaction
  await db.run("BEGIN TRANSACTION");

  try {
    for (let i = 0; i < 10; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const nickname = faker.internet.userName();
      await db.run(sql, [name, email, nickname]);
    }

    //commit transaction
    await db.run("COMMIT");
  } catch (e) {
    console.log(`Error: ${e.message}`);
    await db.run("ROLLBACK");
  }

  db.close();
}

await createTable();
await insertRows();
