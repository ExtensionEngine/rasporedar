export function hash(key: unknown): string {
  return JSON.stringify(key);
}

export function unhash<Type>(value: string): Type {
  return JSON.parse(value);
}
