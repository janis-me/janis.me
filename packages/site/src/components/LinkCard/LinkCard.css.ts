import { select } from 'surimi';
import { slideFill } from '#styles/mixins.ts';
import { linkBox, spread } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const card = select('.link-card');

card.use(linkBox, spread, ...slideFill).style({
	gap: space[8],
	minHeight: '4rem',
	fontWeight: '600',
	textDecoration: 'none',
});

card.child('span').style({ textDecoration: 'underline', textDecorationStyle: 'dashed' });

card.child('svg').style({ flexShrink: '0', color: color.primary.base, transition: 'color 0.2s ease-out' });

select(`${card}:is(:hover, :focus-visible) > svg`).style({ color: 'inherit' });
