import { media, select } from 'surimi';
import { above, between, breakpoints, from, upTo } from '#styles/media.ts';
import { framed, line, row, spread, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

// Raw layout (PDF/print source).
const sheet = select('.sheet');

sheet.use(framed).style({
	margin: space[32],
	paddingBottom: space[32],
});

sheet
	.child('.raw-note')
	.use(surface)
	.style({
		textAlign: 'right',
		padding: `${space[4]} ${space[8]}`,
		borderBottom: line.solid,
	});

// App layout.
const frame = select('.frame');
const nav = frame.child('.site-nav');
const footer = frame.child('.site-footer');

frame.use(framed).style({
	position: 'relative',
	display: 'grid',
	gridTemplateRows: `${space[48]} 1fr fit-content(${space[48]})`,
	width: '40%',
	height: '100%',
	minHeight: '100px',
	margin: 'auto',
	overflow: 'hidden',
});

frame.child('main').style({
	height: '100%',
	overflowY: 'auto',
});

nav.use(spread).style({
	gap: space[32],
	height: '100%',
	padding: `${space[8]} ${space[16]}`,
	borderBottom: line.solid,
});

nav.child('.pages').use(row).style({ gap: space[8] });
nav.child('.socials').use(row).style({ gap: space[12] });

nav.descendant('a[aria-current="page"]').style({
	textDecorationStyle: 'solid',
	textDecorationThickness: '2px',
});

footer.use(row).style({
	height: '100%',
	paddingLeft: space[16],
	borderTop: line.solid,
});

footer.child('p').style({
	margin: `${space[8]} 0`,
});

upTo('tablet').select(footer.descendant('.extra')).style({ display: 'none' });

// Frame width per viewport. Short viewports override the width ladder.
const sizes = [
	[from('ultrawide'), '40%', '75%'],
	[above('desktop').and().width('<', breakpoints.ultrawide), '70%', '80%'],
	[between('tablet', 'desktop'), '80%', '80%'],
	[between('phone', 'tablet'), '90%', '90%'],
	[upTo('phone'), '96%', '98%'],
] as const;

for (const [query, width, maxHeight] of sizes) {
	query.select(frame).style({ width, maxHeight });
}

const short = (height: string) => media().height('<', height).and().width('>', breakpoints.tablet);

short('800px').select(frame).style({ width: '80%' });
short('600px').select(frame).style({ width: '90%', maxHeight: '100%' });
short('500px').select(frame).style({ width: '100%', maxHeight: '100%', border: 'none' });
