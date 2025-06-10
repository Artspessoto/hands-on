import crypto from "crypto";
import { AppError } from "./AppError";
import { env } from "../validations/env";

const ENCRYPTION_KEY = env.ENCRYPTION_KEY;
const IV_KEY = env.IV_KEY;

if (ENCRYPTION_KEY.length !== 32 || IV_KEY.length !== 16) {
  throw new AppError(
    "A chave de criptografia (32 bytes) ou IV (16 bytes) está incorreta."
  );
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(encryptedText: string): string {
  const [ivHex, encrypted] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
