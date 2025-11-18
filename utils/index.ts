export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const cleanedHex = hex.replace("#", "");

  if (cleanedHex.length !== 6) {
    throw new Error("Invalid HEX color. Expected format: #RRGGBB");
  }

  const r = parseInt(cleanedHex.slice(0, 2), 16);
  const g = parseInt(cleanedHex.slice(2, 4), 16);
  const b = parseInt(cleanedHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
