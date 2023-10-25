export function generateRandomNumber(min:number, max: number, numAfterDigit = 0): number {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomNumber(0, items.length - 1);
  const endPosition = startPosition + generateRandomNumber(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomNumber(0, items.length - 1)];
}

export function generateRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
