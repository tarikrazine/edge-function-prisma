import { prisma } from "../../utils/prisma";

export function getPosts() {
  return prisma.post.findMany();
}
