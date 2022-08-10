export function range(from: number, to: number, step = 1) {
  return [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
}

export function shuffleArray<Type>(value: Type[]): Type[] {
  const array = [...value];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
