import { Horse } from "../types/models/horse.model";

export const HORSE_COUNT = 20;

export const COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "indigo",
  "violet",
  "gold",
  "silver",
  "maroon",
  "navy",
  "olive",
  "turquoise",
];

/**
 * Generates an array of Horse objects with random conditions and colors
 */
export function generateHorses(): Horse[] {
  return Array.from({ length: HORSE_COUNT }, (_, i) => ({
    roundIndex: i,
    id: i + 1,
    name: `Horse ${i + 1}`,
    color: COLORS[i],
    condition: Math.floor(Math.random() * 100) + 1,
    progress: 0,
  }));
}
