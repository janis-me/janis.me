import { select } from 'surimi';
import { focusRing, hoverBorder } from '#styles/mixins.ts';
import { gridPaper, line, spread } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const card = select('.link-card');

card.use(gridPaper, spread, focusRing, hoverBorder).style({
	gap: space[8],
	minHeight: '4rem',
	padding: space[16],
	border: line.dashed,
	color: color.fg.base,
	fontWeight: '600',
	textDecoration: 'none',
	transition: 'border-color 0.15s',
});

card.child('span').style({ textDecoration: 'underline', textDecorationStyle: 'dashed' });

card.child('svg').style({ flexShrink: '0', color: color.primary.base });
