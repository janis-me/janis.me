import { select } from 'surimi';
import { upTo } from '#styles/media.ts';
import { focusRing, hoverFill, pressedFill } from '#styles/mixins.ts';
import { control, line, row, spread, surface } from '#styles/presets.ts';
import { theme } from '#styles/theme.css.ts';

const { space } = theme;

const header = select('.site-header');
const home = header.child('.home');
const logo = home.child('.logo');
const nav = header.child('.site-nav');

const picker = header.descendant('.theme-picker');
const trigger = picker.child('summary');
const menu = picker.child('menu');
const option = menu.descendant('button');

header.use(surface, spread).style({
	position: 'sticky',
	top: '0',
	zIndex: '20',
	gap: space[24],
	flexShrink: '0',
	width: '100%',
	height: space[64],
	padding: `0 ${space[64]}`,
	borderBottom: line.solid,
});

nav.use(row).style({
	gap: space[16],
	marginLeft: 'auto',
});

nav.child('a[aria-current="page"]').style({
	textDecorationStyle: 'solid',
	textDecorationThickness: '2px',
});

home.use(row);

logo.style({
	width: space[32],
	height: space[32],
});

picker.style({
	position: 'relative',
});

trigger.use(control, row, hoverFill, focusRing).style({
	gap: space[8],
	minWidth: '10ch',
	justifyContent: 'space-between',
	listStyle: 'none',
	userSelect: 'none',
});

select(`${trigger}::-webkit-details-marker`).style({
	display: 'none',
});

trigger.after().style({
	content: '"▾"',
	transition: 'rotate 0.15s',
});

select(`${picker}[open] > summary::after`).style({
	rotate: '180deg',
});

menu.use(surface).style({
	position: 'absolute',
	top: `calc(100% + ${space[4]})`,
	right: '0',
	zIndex: '10',
	minWidth: '100%',
	margin: '0',
	padding: '0',
	listStyle: 'none',
	border: line.dashed,
});

menu.child('li').adjacent('li').style({
	borderTop: line.dashed,
});

option.use(row, hoverFill, pressedFill, focusRing).style({
	gap: space[8],
	width: '100%',
	padding: `${space[4]} ${space[8]}`,
	font: 'inherit',
	color: 'inherit',
	textAlign: 'left',
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
});

option.before().style({
	content: '"□"',
});

select(`${option}[aria-pressed="true"]::before`).style({
	content: '"■"',
});

upTo('desktop').select(header).style({ paddingInline: space[32] });
upTo('desktop').select(logo).style({ width: space[32], height: space[32] });

upTo('tablet').select(header).style({ paddingInline: space[16], gap: space[12] });
upTo('tablet').select(nav).style({ gap: space[8] });
// The logo already links home.
upTo('phone').select(nav.child('a[href="/"]')).style({ display: 'none' });
upTo('tablet').select(logo).style({ width: space[24], height: space[24] });
