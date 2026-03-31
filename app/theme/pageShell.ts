/**
 * Site-wide content width and horizontal gutters.
 * Wider than `max-w-7xl` (80rem) with smaller side padding so main content uses more of the viewport.
 */
export const pageGutterX = "px-6 sm:px-8 lg:px-10";

/** Centered column: full width up to max, with shared gutters */
export const pageShell = `mx-auto w-full max-w-[90rem] ${pageGutterX}`;
