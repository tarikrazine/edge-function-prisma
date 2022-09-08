export async function readFrom<T>(
  cache: KVNamespace,
  path: string
): Promise<T> {
  const data = await cache.get(path);

  return JSON.parse(data!);
}

export async function writeTo<T>(
  cache: KVNamespace,
  path: string,
  data: Object | {}[]
) {
  await cache.put(path, JSON.stringify(data));
}
