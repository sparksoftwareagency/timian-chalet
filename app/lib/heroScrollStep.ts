/** Viewport-height multiplier for the home Hero snap / expand scroll step. */
export const HERO_SCROLL_VIEWPORT_MULT_LANDING = 0.95;

/** Viewport-height multiplier for subpage hero snap jumps (restaurant, wellness, etc.). */
export const HERO_SCROLL_VIEWPORT_MULT_SUBPAGE = 1.05;

export function heroScrollStepPx(viewportHeightMultiplier: number): number {
  return typeof window !== "undefined"
    ? window.innerHeight * viewportHeightMultiplier
    : 0;
}
