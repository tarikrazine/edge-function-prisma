import { prisma } from "../../utils/prisma";

export async function createUser() {
  return prisma;
}
