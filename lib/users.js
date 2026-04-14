import bcrypt from "bcryptjs";
import db from "./db";
import logger from "./logger";

const COLLECTION = "users";
const SALT_ROUNDS = 10;

/**
 * Seed a couple of demo accounts on first use so the login page still works
 * after the migration from the hardcoded test array to the file-backed db.
 */
function seedIfEmpty() {
  const existing = db.findAll(COLLECTION);
  if (existing.length > 0) return;

  const seedUsers = [
    {
      email: "jean.dupont@example.com",
      name: "Jean Dupont",
      avatar: "👨‍💼",
      plan: "Pro",
      role: "user",
      passwordHash: bcrypt.hashSync("password123", SALT_ROUNDS),
    },
    {
      email: "marie.martin@example.com",
      name: "Marie Martin",
      avatar: "👩‍💼",
      plan: "Starter",
      role: "user",
      passwordHash: bcrypt.hashSync("password123", SALT_ROUNDS),
    },
    {
      email: "admin@neurix.dev",
      name: "Admin",
      avatar: "🛡️",
      plan: "Enterprise",
      role: "admin",
      passwordHash: bcrypt.hashSync("admin1234", SALT_ROUNDS),
    },
  ];

  for (const u of seedUsers) {
    db.create(COLLECTION, u);
  }
  logger.info("seeded demo users", { count: seedUsers.length });
}

seedIfEmpty();

export function findUserByEmail(email) {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();
  return db.findOne(
    COLLECTION,
    (u) => u.email.toLowerCase() === normalized
  );
}

export function findUserById(id) {
  return db.findById(COLLECTION, id);
}

export async function verifyPassword(plain, hash) {
  if (!plain || !hash) return false;
  return bcrypt.compare(plain, hash);
}

export async function createUser({ name, email, password, avatar, plan }) {
  if (findUserByEmail(email)) {
    const err = new Error("Un compte existe déjà avec cet email");
    err.code = "USER_EXISTS";
    throw err;
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = db.create(COLLECTION, {
    email: email.trim().toLowerCase(),
    name: name.trim(),
    avatar: avatar || "👤",
    plan: plan || "Starter",
    role: "user",
    passwordHash,
  });
  return toPublic(user);
}

export function toPublic(user) {
  if (!user) return null;
  // eslint-disable-next-line no-unused-vars
  const { passwordHash, ...rest } = user;
  return rest;
}
