export const palette = {
  warmWhite: "#FAF7F2",
  blushStone: "#E8E0D5",
  deepSage: "#6B7C6A",
  dustyRoseGold: "#B8956A",
  charcoalBlack: "#1C1C1C",
  warmGray: "#7A7067",
  pearl: "#D9D3C7",
} as const;

export const colors = {
  primaryBg: palette.warmWhite,
  secondaryBg: palette.blushStone,
  accent: palette.deepSage,
  cta: palette.dustyRoseGold,
  textPrimary: palette.charcoalBlack,
  textSecondary: palette.warmGray,
  border: palette.pearl,
} as const;

export function rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
