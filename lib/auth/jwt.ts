import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "1m"; // (Development Testing Config)
// const JWT_EXPIRES_IN = "7d";

/**
 * JWT payload structure
 */
export interface JWTPayload {
  userId: string;
  email: string;
}

/**
 * Generate JWT token for authenticated user
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}
