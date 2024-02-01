import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const { error, hash } = await hashPassword(password);

  console.log(hash);

  if (error) {
    // TODO: Handle error
  }

  const user = await prisma.user.create({ data: { ...rest, password: hash }});

  return user;
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}