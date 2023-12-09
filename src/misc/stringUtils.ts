const stringHashCache: { [key: string]: number } = {};

function stringToHash(str: string): number {
  if (stringHashCache[str]) {
    return stringHashCache[str];
  }

  let hash = 0;
  if (str.length === 0) {
    stringHashCache[str] = hash;
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32-bit integer
  }

  stringHashCache[str] = hash;
  return hash;
}

function getColorFromString(str: string, colors: string[]): string {
  const hash: number = stringToHash(str);
  const index: number = Math.abs(hash) % colors.length;
  const color: string = colors[index];
  return color;
}

export { stringToHash, getColorFromString };
