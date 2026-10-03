import { select } from 'surimi';
import { print, upTo } from '#styles/media.ts';
import { ellipsis, flush, inset, line, row, spread, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

// Every area is a direct `.section` child of `.cv` with a matching class.
const areas = ['title', 'subtitle', 'intro', 'education', 'experience', 'random', 'other', 'outro'] as const;
type Area = (typeof areas)[number];

const layouts = {
	wide: [
		['title', 'title'],
		['subtitle', 'subtitle'],
		['intro', 'intro'],
		['education', 'experience'],
		['random', 'other'],
		['outro', 'outro'],
	],
	narrow: [['title'], ['subtitle'], ['intro'], ['education'], ['experience'], ['other'], ['random'], ['outro']],
} satisfies Record<string, Area[][]>;

const toTemplate = (rows: Area[][]) => rows.map(cells => `"${cells.join(' ')}"`).join(' ');

const cv = select('.cv');
const section = cv.child('.section');
const area = (name: Area) => cv.child(`.${name}`);

cv.style({
	display: 'grid',
	gridTemplateAreas: toTemplate(layouts.wide),
	gridTemplateColumns: '2fr 3fr',
	gridAutoRows: 'min-content',
	width: '100%',
	height: '100%',
	color: color.text,
});

for (const name of areas) {
	area(name).style({ gridArea: name });
}

section.use(surface).style({
	borderTop: line.solid,
});

section
	.child('h3')
	.use(row, flush)
	.style({
		height: space[32],
		padding: `0 ${space[16]}`,
		fontSize: '1em',
		fontWeight: 'bold',
		borderBottom: line.muted,
	});

section.child('.body').use(inset);

select(`${cv} p`, `${cv} h2`, `${cv} ul`).use(flush);

area('title').use(spread, inset).style({
	borderTop: 'none',
});

area('title').child('span').use(row).style({
	fontSize: '0.8rem',
	gap: space[12],
});

area('subtitle').use(ellipsis, inset).style({
	width: '100%',
});

select(`${area('education')}`, `${area('random')}`).style({
	borderRight: line.solid,
});

print().select(area('experience')).style({
	breakAfter: 'page',
});

print()
	.select(`${area('random')}`, `${area('other')}`)
	.style({
		marginTop: space[16],
	});

upTo('tablet')
	.select(cv)
	.style({
		gridTemplateAreas: toTemplate(layouts.narrow),
		gridTemplateColumns: '1fr',
	});

upTo('tablet')
	.select(`${area('education')}`, `${area('random')}`)
	.style({
		borderRight: 'none',
	});
