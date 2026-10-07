import { select } from 'surimi';
import { slideFill } from '#styles/mixins.ts';
import { chip, eyebrow, flush, linkBox, row } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

const card = select('.post-card');
const meta = card.child('.meta');

card.use(linkBox, ...slideFill).style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[8],
	textDecoration: 'none',
});

meta.use(row).style({ gap: space[8], flexWrap: 'wrap' });

meta.child('time').use(eyebrow).style({ transition: 'color 0.2s ease-out' });

select(`${card}:is(:hover, :focus-visible) time`).style({ color: 'inherit' });

meta.child('.tags').use(row).style({ gap: space[4], flexWrap: 'wrap', marginLeft: 'auto' });

meta.descendant('.tag').use(chip).style({ height: space[20] });

card.child('h3').use(flush).style({
	fontSize: '1rem',
	lineHeight: '1.4',
	textWrap: 'pretty',
});
