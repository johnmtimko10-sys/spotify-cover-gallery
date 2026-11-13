export type LightColor = { name: string; l: number; c: number; h: number };

export const LIGHT_PRESETS: LightColor[] = [
  { name: "Warm", l: 0.9, c: 0.09, h: 75 },
  { name: "Daylight", l: 0.96, c: 0.02, h: 230 },
  { name: "Green", l: 0.85, c: 0.21, h: 152 },
  { name: "Purple", l: 0.65, c: 0.25, h: 295 },
  { name: "Blue", l: 0.7, c: 0.17, h: 250 },
  { name: "Red", l: 0.65, c: 0.23, h: 25 },
  { name: "Orange", l: 0.78, c: 0.17, h: 55 },
  { name: "Pink", l: 0.75, c: 0.18, h: 350 },
];

export function toCss(c: LightColor) {
  return `oklch(${c.l} ${c.c} ${c.h})`;
}

export function fromHue(h: number): LightColor {
  return { name: "Custom", l: 0.78, c: 0.18, h };
}
