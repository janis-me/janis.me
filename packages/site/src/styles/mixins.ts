import { mixin } from 'surimi';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

export const focusRing = mixin(':focus-visible').style({
	outline: `1px dashed ${color.primary.base}`,
	outlineOffset: space[2],
});

export const hoverFill = mixin(':hover').style({
	backgroundColor: color.bg.muted,
});

export const hoverBorder = mixin(':hover').style({
	borderColor: color.primary.base,
});

export const pressedFill = mixin('[aria-pressed="true"]').style({
	backgroundColor: color.bg.emphasis,
});
