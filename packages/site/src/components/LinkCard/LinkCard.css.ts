import { mixin, select } from 'surimi';
import { focusRing } from '#styles/mixins.ts';
import { gridPaper, line, spread } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const card = select('.link-card');

card.use(gridPaper, spread, focusRing).style({
	gap: space[8],
	minHeight: '4rem',
	padding: space[16],
	border: line.dashed,
	color: color.fg.base,
	fontWeight: '600',
	textDecoration: 'none',
	transition: 'border-color 0.15s',
});

card.use(mixin(':hover').style({ borderColor: color.primary.base }));

card.child('span').style({ textDecoration: 'underline', textDecorationStyle: 'dashed' });

card.child('svg').style({ flexShrink: '0', color: color.primary.base });
