import { User } from "@prisma/client";

import { prisma } from "../../utils/prisma";

export async function createUser(
  data: Pick<User, "email" | "password">
): Promise<User> {
  return prisma.user.create({
    data,
  });
}
