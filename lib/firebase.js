/**
 * Lazy-initialized Firebase client SDK singleton.
 *
 * Returns `null` when `NEXT_PUBLIC_FIREBASE_API_KEY` is not set, so the app
 * still boots in dev/CI/demo environments without Firebase credentials —
 * callers must handle that case (mirrors `lib/stripe.js`).
 *
 * Uses the modular (tree-shakable) Firebase v9+ API.
 */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import logger from "./logger";

let _app = null;

function firebaseConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return null;
  return {
    apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
}

export function getFirebaseApp() {
  if (_app) return _app;
  const config = firebaseConfig();
  if (!config) {
    logger.warn("firebase: NEXT_PUBLIC_FIREBASE_API_KEY missing — client disabled");
    return null;
  }
  _app = getApps().length ? getApp() : initializeApp(config);
  return _app;
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

export function getFirebaseDb() {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig());
}
