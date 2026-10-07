import { mixin, style } from 'surimi';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

export const focusRing = mixin(':focus-visible').style({
	outline: `1px dashed ${color.primary.base}`,
	outlineOffset: space[2],
});

const slideFillBase = style({
	backgroundImage: `linear-gradient(${color.primary.base}, ${color.primary.base})`,
	backgroundRepeat: 'no-repeat',
	backgroundPosition: '0 100%',
	backgroundSize: '100% 0',
	transition:
		'background-size 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out, text-decoration-color 0.2s ease-out',
});

const filled = {
	backgroundSize: '100% 100%',
	color: color.primary.fg,
	borderColor: color.primary.base,
	textDecorationColor: 'currentColor',
} as const;

const slideFillHover = mixin(':hover').style(filled);
const slideFillFocus = mixin(':focus-visible').style(filled);

export const slideFill = [slideFillBase, slideFillHover, slideFillFocus] as const;

export const pressedFill = mixin('[aria-pressed="true"]').style({
	backgroundColor: color.primary.subtle,
});
