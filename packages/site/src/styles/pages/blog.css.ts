import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { eyebrow, flush, gridPaper, line, spread } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const posts = select('.posts');
const year = posts.child('.year');
const divider = year.child('.year-divider');

posts.style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[32],
});

year.style({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
	gap: space[12],
});

// Mini paper card, full row, heads each year.
divider.use(gridPaper, spread).style({
	gridColumn: '1 / -1',
	gap: space[16],
	padding: `${space[8]} ${space[16]}`,
	border: line.solid,
});

divider.child('h2').use(flush, eyebrow).style({ fontSize: '1rem', fontWeight: '600' });

divider.child('span').style({ color: color.fg.muted, fontSize: '0.8rem' });

upTo('tablet').select(year).style({ gridTemplateColumns: 'minmax(0, 1fr)' });
