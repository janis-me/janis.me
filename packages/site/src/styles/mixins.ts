import { mixin } from 'surimi';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

export const focusRing = mixin(':focus-visible').style({
	outline: `1px dashed ${color.text}`,
	outlineOffset: space[2],
});

export const hoverFill = mixin(':hover').style({
	backgroundColor: color.gray3,
});

export const pressedFill = mixin('[aria-pressed="true"]').style({
	backgroundColor: color.gray4,
});
