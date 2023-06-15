// 최종 목표 : express와 sqlite3를 이용하여 간단한 CRUD를 구현한다.

import express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import * as api from "./db-api.mjs";

const app = express();
app.use(express.json());
const dbPath = path.join(path.resolve(), "test.sqlite3");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // create route root handler
    app.get("/", (request, response) => {
      response.send("Hello World!");
    });

    // create route /Test handler

    // get all rows
    app.get("/Test/", async (request, response) => {
      const rows = await api.selectAllRows(db);
      response.send(rows);
    });

    // get row by id
    app.get("/Test/:id/", async (request, response) => {
      const { id } = request.params;
      const row = await api.selectRowById(db, id);
      response.send(row);
    });

    // insert row
    app.post("/Test/", async (request, response) => {
      const { name, email, nickname } = request.body;
      const result = await api.insertRow(db, name, email, nickname);
      response.send(result);
    });

    // update row
    app.put("/Test/:id/", async (request, response) => {
      const { id } = request.params;
      const { name, email, nickname } = request.body;
      const result = await api.updateRow(db, id, name, email, nickname);
      response.send(result);
    });

    // delete row
    app.delete("/Test/:id/", async (request, response) => {
      const { id } = request.params;
      const result = await api.deleteRow(db, id);
      response.send(result);
    });

    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);

    process.exit(1);
  }
};

initializeDBAndServer();
