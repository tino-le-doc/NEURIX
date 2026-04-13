/**
 * Simple file-backed JSON database for development.
 *
 * NOTE: This is intended as a pragmatic dev/demo store. For production,
 * replace this module with a real database (PostgreSQL + Prisma, etc.).
 * The public API (findAll, findById, create, update, remove) is kept
 * intentionally small to make that migration easy.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), ".data");

function ensureStore(collection) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const file = path.join(DATA_DIR, `${collection}.json`);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]", "utf8");
  }
  return file;
}

function readCollection(collection) {
  const file = ensureStore(collection);
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error(`[db] failed to read ${collection}:`, err);
    return [];
  }
}

function writeCollection(collection, rows) {
  const file = ensureStore(collection);
  fs.writeFileSync(file, JSON.stringify(rows, null, 2), "utf8");
}

export function findAll(collection, predicate) {
  const rows = readCollection(collection);
  return typeof predicate === "function" ? rows.filter(predicate) : rows;
}

export function findOne(collection, predicate) {
  return readCollection(collection).find(predicate) || null;
}

export function findById(collection, id) {
  return findOne(collection, (row) => row.id === id);
}

export function create(collection, data) {
  const rows = readCollection(collection);
  const now = new Date().toISOString();
  const row = {
    id: data.id || crypto.randomUUID(),
    ...data,
    createdAt: data.createdAt || now,
    updatedAt: now,
  };
  rows.push(row);
  writeCollection(collection, rows);
  return row;
}

export function update(collection, id, patch) {
  const rows = readCollection(collection);
  const idx = rows.findIndex((row) => row.id === id);
  if (idx === -1) return null;
  rows[idx] = {
    ...rows[idx],
    ...patch,
    id: rows[idx].id,
    updatedAt: new Date().toISOString(),
  };
  writeCollection(collection, rows);
  return rows[idx];
}

export function remove(collection, id) {
  const rows = readCollection(collection);
  const next = rows.filter((row) => row.id !== id);
  if (next.length === rows.length) return false;
  writeCollection(collection, next);
  return true;
}

const db = { findAll, findOne, findById, create, update, remove };
export default db;
