import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

const spans = [2, 3, 4, 6] as const;

const hero = select('.about-hero');
const placed = select(`${hero} > [data-span]`);

hero.style({
	display: 'grid',
	gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
	gap: space[12],
});

for (const span of spans) {
	select(`${hero} > [data-span="${span}"]`).style({ gridColumn: `span ${span}` });
}

// Big number, label underneath.
const stat = select(`${hero} > .stat`);

stat.child('strong').style({
	color: color.primary.base,
	lineHeight: '1',
});

// Two columns: small tiles pair up, everything else spans the row.
upTo('tablet').select(hero).style({ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridAutoFlow: 'dense' });
upTo('tablet').select(placed).style({ gridColumn: '1 / -1' });
upTo('tablet').select(`${hero} > [data-span="2"]`).style({ gridColumn: 'span 1' });
upTo('tablet').select(`${hero} > .link-card:last-child`).style({ gridColumn: '1 / -1' });

upTo('phone').select(`${hero} > [data-span="2"]`).style({ gridColumn: '1 / -1' });
