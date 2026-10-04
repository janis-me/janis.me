import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { eyebrow, flush, line } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const spans = [2, 3, 4, 6] as const;

const hero = select('.about-hero');
const tile = hero.child('.tile');

hero.style({
	display: 'grid',
	gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
	gap: space[12],
});

tile.style({
	display: 'flex',
	flexDirection: 'column',
	gap: space[8],
	padding: space[16],
	border: line.dashed,
});

for (const span of spans) {
	select(`${hero} > [data-span="${span}"]`).style({ gridColumn: `span ${span}` });
}

tile.child('h2').use(flush, eyebrow);

select(`${tile} > p`, `${tile} > ul`).use(flush);

tile.child('ul').style({ paddingLeft: space[16] });

tile.descendant('li').adjacent('li').style({ marginTop: space[4] });

// Big number, label underneath.
const stat = select(`${hero} > .stat`);

stat.style({ justifyContent: 'center' });

stat.child('strong').style({
	color: color.primary.base,
	fontSize: '2rem',
	lineHeight: '1',
});

stat.child('p').style({ color: color.fg.muted, fontSize: '0.875rem' });

select(`${hero} > .accent`).style({
	backgroundColor: color.primary.subtle,
	border: line.solid,
});

// Two columns: small tiles pair up, everything else spans the row.
upTo('tablet').select(hero).style({ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridAutoFlow: 'dense' });
upTo('tablet').select(tile).style({ gridColumn: '1 / -1' });
upTo('tablet').select(`${hero} > [data-span="2"]`).style({ gridColumn: 'span 1' });
upTo('tablet').select(`${hero} > .link-card:last-child`).style({ gridColumn: '1 / -1' });

upTo('phone').select(`${hero} > [data-span="2"]`).style({ gridColumn: '1 / -1' });
