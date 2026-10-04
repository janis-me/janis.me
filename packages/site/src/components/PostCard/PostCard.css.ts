import { select } from 'surimi';
import { focusRing, hoverBorder } from '#styles/mixins.ts';
import { chip, eyebrow, flush, line, row, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

const card = select('.post-card');
const meta = card.child('.meta');

card.use(surface, focusRing, hoverBorder).style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[12],
	padding: space[16],
	border: line.dashed,
	textDecoration: 'none',
	transition: 'border-color 0.15s',
});

meta.use(row).style({ gap: space[8], flexWrap: 'wrap' });

meta.child('time').use(eyebrow);

meta.child('.tags').use(row).style({ gap: space[4], flexWrap: 'wrap', marginLeft: 'auto' });

meta.descendant('.tag').use(chip).style({ height: space[20] });

card.child('h3').use(flush).style({
	fontSize: '1rem',
	lineHeight: '1.4',
	textWrap: 'pretty',
});
