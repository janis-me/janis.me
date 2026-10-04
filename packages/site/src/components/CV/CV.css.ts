import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { flush, inset, line, row, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

// Every area is a direct `.section` child of `.cv` with a matching class.
const areas = ['intro', 'education', 'experience', 'random', 'other', 'outro'] as const;
type Area = (typeof areas)[number];

const layouts = {
	wide: [
		['intro', 'intro'],
		['education', 'experience'],
		['random', 'other'],
		['outro', 'outro'],
	],
	narrow: [['intro'], ['education'], ['experience'], ['other'], ['random'], ['outro']],
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
	color: color.fg.base,
});

for (const name of areas) {
	area(name).style({ gridArea: name });
}

section.not(':first-of-type').use(surface).style({
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
		borderBottom: line.strong,
	});

section.child('.body').use(inset);

select(`${cv} p`, `${cv} h2`, `${cv} ul`).use(flush);

select(`${area('education')}`, `${area('random')}`).style({
	borderRight: line.solid,
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
