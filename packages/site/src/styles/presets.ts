import { style } from 'surimi';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

export const line = {
	solid: `1px solid ${color.border.base}`,
	dashed: `1px dashed ${color.border.base}`,
	strong: `1px dashed ${color.border.strong}`,
} as const;

export const row = style({
	display: 'flex',
	alignItems: 'center',
});

export const spread = row.extend({
	justifyContent: 'space-between',
});

export const inset = style({
	padding: `${space[8]} ${space[16]}`,
});

export const gutter = style({
	paddingInline: space[16],
});

export const flush = style({
	margin: '0',
});

export const surface = style({
	backgroundColor: color.bg.base,
	color: color.fg.base,
});

export const framed = surface.extend({
	border: line.solid,
});

export const chip = row.extend({
	display: 'inline-flex',
	justifyContent: 'center',
	padding: `0 ${space[4]}`,
	border: line.strong,
	backgroundColor: color.secondary.subtle,
	fontSize: '0.8rem',
});

export const control = style({
	font: 'inherit',
	color: color.fg.base,
	backgroundColor: 'transparent',
	border: line.dashed,
	padding: `${space[2]} ${space[8]}`,
	cursor: 'pointer',
});

export const ellipsis = style({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});
