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

// Graph paper: 50px major lines over 10px minor lines.
export const gridPaper = style({
	backgroundColor: color.bg.base,
	backgroundImage: [
		`linear-gradient(${color.bg.muted} 2px, transparent 2px)`,
		`linear-gradient(90deg, ${color.bg.muted} 2px, transparent 2px)`,
		`linear-gradient(${color.bg.muted} 1px, transparent 1px)`,
		`linear-gradient(90deg, ${color.bg.muted} 1px, ${color.bg.base} 1px)`,
	].join(', '),
	backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
	backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px',
	backgroundRepeat: 'repeat',
});

export const framed = surface.extend({
	border: line.solid,
});

export const chip = row.extend({
	display: 'inline-flex',
	justifyContent: 'center',
	padding: `0 ${space[4]}`,
	border: line.dashed,
	color: color.fg.muted,
	backgroundColor: color.bg.muted,
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

export const eyebrow = style({
	color: color.primary.base,
	fontSize: '0.8rem',
	textTransform: 'uppercase',
	letterSpacing: '0.1em',
});

export const ellipsis = style({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});
