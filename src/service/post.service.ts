import { prisma } from "../utils/prisma";

export function getPosts() {
  return prisma.post.findMany();
}

export function getPost(id: number) {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
}
