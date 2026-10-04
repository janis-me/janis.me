import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { eyebrow, flush, gridPaper, line } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const head = select('.page-head');
const group = head.child('hgroup');

head.use(gridPaper).style({
	display: 'flex',
	flexDirection: 'column',
	flexShrink: '0',
	minHeight: '250px',
	borderBottom: line.solid,
	paddingBlock: space[56],
});

group.style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[8],
	marginInline: 'auto',
});

select(`${group} > p`, `${group} > h1`).use(flush);

group.child('h1').style({
	fontSize: 'clamp(1.4rem, 1rem + 1.5vw, 2rem)',
	lineHeight: '1.2',
	textWrap: 'balance',
});

group.child('.eyebrow').use(eyebrow);

group.child('.subtitle').style({
	maxWidth: '100ch',
	color: color.fg.muted,
});

upTo('tablet').select(head).style({ minHeight: '150px', paddingBlock: space[32] });
