import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { slideFill } from '#styles/mixins.ts';
import { ellipsis, line, row, spread, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { color, space } = theme;

// Gap to the site header while stuck.
const offset = space[12];
const height = space[40];

const bar = select('.page-bar');
const link = bar.child('a');
const hidden = select('.page-bar:not([data-scrolled])');

// Sits on the frame's border (-1px), so once stuck it reads as the frame's top edge.
bar.use(surface, spread).style({
	position: 'sticky',
	top: `calc(${space[64]} + ${offset})`,
	zIndex: '1',
	gap: space[16],
	height,
	margin: '-1px -1px 0',
	padding: `0 ${space[16]}`,
	border: line.solid,
	borderBottom: line.dashed,
	fontSize: '0.875rem',
	whiteSpace: 'nowrap',
});

// Covers the gap above the stuck bar, so content never shows between it and the header.
bar.before().style({
	content: '""',
	position: 'absolute',
	right: '-1px',
	bottom: 'calc(100% + 1px)',
	left: '-1px',
	height: offset,
	backgroundColor: color.bg.base,
});

link.use(row, ...slideFill).style({
	gap: space[8],
	paddingInline: space[4],
	marginInline: `calc(-1 * ${space[4]})`,
	textDecoration: 'none',
	transition: 'background-size 0.2s ease-out, color 0.2s ease-out, opacity 0.15s, visibility 0.15s',
});

link.style({ minWidth: '0' });

link.child('span').style({
	textDecoration: 'underline',
	textDecorationStyle: 'dashed',
});

// `ellipsis` clips overflow, and the underline sits below the text box: pad it back inside.
bar.child('a:not(.to-top)').child('span').use(ellipsis).style({
	paddingBlock: space[4],
});

link.child('svg').style({ flexShrink: '0' });

bar.child('.to-top').style({
	flexShrink: '0',
	marginLeft: 'auto',
});

hidden.child('.to-top').style({
	visibility: 'hidden',
	opacity: '0',
});

// Without a back link the bar only exists for "back to top": no space in the flow, hidden until needed.
select('.page-bar.floating').style({
	marginBottom: `calc(-1 * ${height})`,
	transition: 'opacity 0.15s, visibility 0.15s',
});

select('.page-bar.floating:not([data-scrolled])').style({
	visibility: 'hidden',
	opacity: '0',
});

upTo('tablet').select(bar).style({ fontSize: '0.8rem' });
