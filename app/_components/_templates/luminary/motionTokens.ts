// Mirrors the --ease-* custom properties in luminary-theme.css.
// Framer Motion transitions can't read CSS custom properties directly,
// so these arrays must stay numerically identical to the CSS tokens.
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];
