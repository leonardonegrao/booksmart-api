import { hash, compare } from "bcrypt";

export async function hashPassword(password: string) {
  const response = { error: "", hash: "" };

  try {
    const hashedPassword = await hash(password, 10);
    response.hash = hashedPassword;
  } catch (e) {
    response.error = "Error hashing password";
  }

  return response;
}

export async function verifyPassword(password: string, hashPassword: string) {
  const response = { error: "", valid: false };

  try {
    response.valid = await compare(password, hashPassword);
  } catch (e) {
    response.error = "Error verifying password";
  }

  return response;
}