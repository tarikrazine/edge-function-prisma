import { User } from "@prisma/client";

import { prisma } from "../utils/prisma";

export async function createUser(
  data: Pick<User, "name" | "email" | "password">
): Promise<User> {
  return prisma.user.create({
    data,
  });
}

export async function findUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
